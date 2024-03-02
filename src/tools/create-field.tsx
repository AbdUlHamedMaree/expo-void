import React, { forwardRef, memo } from 'react';
import { ControllerProps, useController, useFormContext } from 'react-hook-form';

export type FieldProps<T> = T & Omit<ControllerProps, 'render' | 'control'>;
export type FieldComponentProps<T> = T & { form: RenderArg };
export type RenderFn = ControllerProps['render'];
export type RenderArg = Parameters<RenderFn>[0];

export const createField = <T,>(Component: React.ComponentType<FieldComponentProps<T>>) =>
  memo(
    forwardRef<React.ComponentRef<typeof Component>, FieldProps<T>>(function Field(
      { name, defaultValue, disabled, rules, shouldUnregister, ...props },
      ref
    ) {
      const { control } = useFormContext();

      const form = useController({
        name,
        control,
        defaultValue,
        disabled,
        rules,
        shouldUnregister,
      });

      return <Component {...(props as T)} form={form} ref={ref} />;
    })
  );
