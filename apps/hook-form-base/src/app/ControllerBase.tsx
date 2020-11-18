import React from 'react';
import { Input, Form, Button, Select, Radio, Checkbox } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { array, mixed, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers';

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
type Gender = typeof Gender[keyof typeof Gender];

const Role = {
  ADMINISTRATOR: 'administrator',
  STAFF: 'staff',
  USER: 'user',
} as const;
type Role = typeof Role[keyof typeof Role];

type FormType = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
  role: Role;
  agree: boolean;
  color: string[];
};

const { Option } = Select;

const isInValid = (hasError) => (hasError ? 'error' : 'success');

export const ControllerBase = () => {
  const schema = object().shape<FormType>({
    firstName: string().required(),
    lastName: string().required(),
    age: number().required().positive().integer(),
    gender: mixed()
      .oneOf([...Object.values(Gender)])
      .defined(),
    role: mixed()
      .required()
      .oneOf([...Object.values(Role)])
      .defined(),
    agree: mixed().oneOf([true]),
    color: array().of(string()).required(),
  });
  const { handleSubmit, control, errors, register } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
      gender: null,
      role: Role.ADMINISTRATOR,
      agree: false,
      color: [],
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  console.log({ errors });

  return (
    <Form onFinish={onSubmit} layout={'vertical'}>
      <Form.Item
        label={'First Name'}
        help={errors?.firstName?.message}
        validateStatus={isInValid(errors.firstName)}
        hasFeedback
      >
        <Controller as={Input} name={'firstName'} control={control} />
      </Form.Item>
      <Form.Item
        label={'Last Name'}
        help={errors?.lastName?.message}
        validateStatus={isInValid(errors.lastName)}
        hasFeedback
      >
        <Controller as={Input} name={'lastName'} control={control} />
      </Form.Item>
      <Form.Item
        label={'Age'}
        help={errors?.age?.message}
        validateStatus={isInValid(errors.age)}
        hasFeedback
      >
        <Controller as={Input} name={'age'} control={control} />
      </Form.Item>
      <Form.Item
        label={'Gender'}
        help={errors?.gender?.message}
        validateStatus={isInValid(errors.gender)}
        hasFeedback
      >
        <Controller
          as={
            <Select>
              {Object.values(Gender).map((gender, index) => (
                <Option key={index} value={gender}>
                  {gender}
                </Option>
              ))}
            </Select>
          }
          name={'gender'}
          control={control}
        />
      </Form.Item>
      <Form.Item label={'Role'}>
        <Controller
          render={({ onChange, value }) => (
            <Radio.Group
              onChange={(e) => onChange(e.target.value)}
              value={value}
            >
              {Object.values(Role).map((role, index) => (
                <Radio key={index} value={role}>
                  {role}
                </Radio>
              ))}
            </Radio.Group>
          )}
          name={'role'}
          control={control}
        />
      </Form.Item>
      <Form.Item
        label={'Agree'}
        help={errors?.agree?.message}
        validateStatus={isInValid(errors.agree)}
        hasFeedback
      >
        <Controller
          render={({ onChange, value }) => (
            <Checkbox
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
            />
          )}
          name="agree"
          type="checkbox"
          control={control}
        />
      </Form.Item>
      <Form.Item
        label={'Favorite Color'}
        validateStatus={isInValid(errors.color)}
        help={errors?.color ? errors.color['message'] : undefined}
        hasFeedback
      >
        {['red', 'blue', 'green'].map((c, i) => {
          return (
            <label key={i}>
              <input
                type={'checkbox'}
                value={c}
                name={'color'}
                ref={register}
              />
              {c}
            </label>
          );
        })}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ControllerBase;
