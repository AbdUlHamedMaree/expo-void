import { useMachine } from '@xstate/react';
import { Audio } from 'expo-av';
import React, { useCallback, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Text, TextInput } from 'react-native-paper';
import Animated, {
  interpolate,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

import { messageMachine } from './message-bar.machine';
import { useChatAppContext } from '../context';

import { mmss } from '$helpers/mmss';
import { useUnmountEffect } from '$hooks/use-lifecycle';
import { isDefined } from '$modules/checks';
import { toast } from '$modules/react-native-paper-toast';
import { commonStyles } from '$styles/common';
import { useAppTheme } from '$theme/hook';
import { spacing } from '$theme/spacing';

const AnimatedIconButton = Animated.createAnimatedComponent(IconButton);

export type MessageBarProps = object;

export const MessageBar: React.FC<MessageBarProps> = () => {
  const { onSend } = useChatAppContext();

  const [state, send] = useMachine(
    messageMachine.provide({
      actions: {
        send: ({ context }) => onSend?.(context.text),
      },
    })
  );

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const theme = useAppTheme();

  const showSendIcon = useMemo(() => state.hasTag('show-send'), [state]);

  const textInputAnimatedStyle = useAnimatedStyle(() => ({
    left: withTiming(showSendIcon ? 0 : 60),
  }));

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: withSpring(state.value === 'recording' ? 1.7 : 1) }],
  }));

  const handleMessageChange = useCallback(
    (text: string) => {
      const trimmedText = text.trim();

      if (trimmedText) send({ type: 'text.typing', text });
      else send({ type: 'text.erase' });
    },
    [send]
  );

  const handleSend = useCallback(() => {
    send({ type: 'send' });
  }, [send]);

  const onRecordStart = useCallback(async () => {
    try {
      if (!permissionResponse?.granted) {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
        status => {
          send({ type: 'record.duration.set', duration: mmss(status.durationMillis) });

          if (status.isDoneRecording) return;

          const metering = status.metering;
          isDefined(metering) &&
            send({ type: 'record.meters.add', meter: Math.max(metering + 80, 0) });
        },
        100
      );

      send({ type: 'record.start', recording });
    } catch (err) {
      toast.warning('Recording Permission required');

      console.error('[onRecordStart] Error', err);
    }
  }, [permissionResponse?.granted, requestPermission, send]);

  const onRecordEnd = useCallback(async () => {
    const recording = state.context.recording;

    await recording?.stopAndUnloadAsync();

    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    if (!recording) {
      send({ type: 'record.cancel' });
      return;
    }

    const uri = recording.getURI();
    if (!uri) {
      send({ type: 'record.cancel' });
      return;
    }

    const { sound } = await Audio.Sound.createAsync({
      uri,
    });

    send({ type: 'record.end', uri, sound });
  }, [send, state.context.recording]);

  useUnmountEffect(() => {
    state.context.sound?.unloadAsync();
    state.context.recording?.stopAndUnloadAsync();
  });

  const metersJsx = useMemo(
    () => (
      <ScrollView
        contentContainerStyle={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        horizontal
      >
        {state.context.meters.map((meter, i) => (
          <View
            key={i}
            style={{
              height: interpolate(meter, [0, 80], [2, 36]),
              backgroundColor: '#FFFFFF',
              width: 2,
              minWidth: 2,
              borderRadius: 1,
              marginRight: 1,
            }}
          />
        ))}
      </ScrollView>
    ),
    [state.context.meters]
  );

  return (
    <View
      style={[
        styles.wrapper,
        commonStyles.screenVerticalPadding,
        commonStyles.screenHorizontalPadding,
        { paddingTop: 8 },
      ]}
    >
      <AnimatedIconButton
        icon='microphone'
        iconColor={theme.colors.onPrimary}
        containerColor={theme.colors.primary}
        onPressIn={onRecordStart}
        onPressOut={onRecordEnd}
        style={[styles.voiceIconButton, animatedStyles]}
      />
      <Animated.View
        style={[
          textInputAnimatedStyle,
          styles.textInputWrapper,
          {
            height: 44,
            backgroundColor: theme.colors.elevation.level3,
            borderRadius: 22,
          },
        ]}
      >
        {state.hasTag('record-input') ? (
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {state.value === 'finished' && (
              <>
                <IconButton
                  icon={state.context.soundStatus === 'paused' ? 'play' : 'pause'}
                  onPress={async () => {
                    if (state.context.soundStatus === 'paused') {
                      send({ type: 'record.sound.start' });

                      state.context.sound?.playAsync();

                      return;
                    }
                    send({ type: 'record.sound.pause' });

                    state.context.sound?.pauseAsync();
                  }}
                  style={{
                    margin: 0,
                  }}
                />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                  {metersJsx}
                </View>
                <IconButton
                  icon='close'
                  onPress={async () => {
                    await state.context.sound?.stopAsync();
                    await state.context.sound?.unloadAsync();
                    send({ type: 'record.cancel' });
                  }}
                  style={{
                    margin: 0,
                  }}
                />
              </>
            )}
            {state.value === 'recording' && (
              <>
                <Text style={{ marginHorizontal: spacing.lg }}>
                  {state.context.duration}
                </Text>
                {metersJsx}
                <View style={{ width: spacing.lg }} />
              </>
            )}
          </View>
        ) : (
          <TextInput
            mode='outlined'
            placeholder='Message'
            outlineColor='transparent'
            activeOutlineColor='transparent'
            value={state.context.text}
            onChangeText={handleMessageChange}
            returnKeyType='send'
            onSubmitEditing={handleSend}
            style={styles.textInput}
            outlineStyle={[
              styles.outlineTextInput,
              {
                backgroundColor: theme.colors.elevation.level3,
              },
            ]}
          />
        )}
      </Animated.View>
      <IconButton
        icon='arrow-up'
        onPress={handleSend}
        iconColor={theme.colors.onPrimaryContainer}
        containerColor={theme.colors.primaryContainer}
        style={styles.sendIconButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  textInputWrapper: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    height: 44,
  },
  outlineTextInput: {
    borderRadius: 28,
  },
  sendIconButton: {
    margin: 0,
    zIndex: -2,
  },
  voiceIconButton: {
    margin: 0,
    marginRight: -60,
  },
});
