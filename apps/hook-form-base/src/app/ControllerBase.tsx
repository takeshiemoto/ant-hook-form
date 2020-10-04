import React from 'react';
import { Input, Form, Button, Select } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { mixed, number, object, string } from 'yup';
import { yupResolver } from '@hookform/resolvers';

const Gender = {
  MALE: 'male',
  FEMALE: 'female',
} as const;
type Gender = typeof Gender[keyof typeof Gender];

type FormType = {
  firstName: string;
  lastName: string;
  age: number;
  gender: Gender;
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
  });
  const { handleSubmit, control, errors } = useForm<FormType>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
      gender: null,
    },
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <Form onFinish={onSubmit}>
      <Form.Item
        help={errors?.firstName?.message}
        validateStatus={isInValid(errors.firstName)}
        hasFeedback
      >
        <Controller as={Input} name={'firstName'} control={control} />
      </Form.Item>
      <Form.Item
        help={errors?.lastName?.message}
        validateStatus={isInValid(errors.lastName)}
        hasFeedback
      >
        <Controller as={Input} name={'lastName'} control={control} />
      </Form.Item>
      <Form.Item
        help={errors?.age?.message}
        validateStatus={isInValid(errors.age)}
        hasFeedback
      >
        <Controller as={Input} name={'age'} control={control} />
      </Form.Item>
      <Form.Item
        help={errors?.gender?.message}
        validateStatus={isInValid(errors.gender)}
        hasFeedback
      >
        <Controller as={Select} name={'gender'} control={control}>
          {Object.values(Gender).map((gender, index) => (
            <Option key={index} value={gender}>
              {gender}
            </Option>
          ))}
        </Controller>
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
