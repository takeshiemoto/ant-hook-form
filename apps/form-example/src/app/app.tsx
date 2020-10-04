import React from 'react';
import { useForm } from 'react-hook-form';
import { Input, Form, Button } from 'antd';
import styled from 'styled-components';

const AppStyle = styled.div`
  padding: 20px;
`;

type FormData = {
  firstName: string;
};

export const App = () => {
  const { handleSubmit, errors, setValue, register } = useForm<FormData>();
  const onSubmit = handleSubmit(({ firstName }) => {
    console.log('-- Values -- ');
    console.log(firstName);
  });

  register('firstName', { required: 'first name is required' });

  console.log('-- Errors-- ');
  console.log(errors);

  return (
    <AppStyle>
      <Form onFinish={onSubmit}>
        <Form.Item
          help={errors?.firstName?.message}
          validateStatus={errors.firstName ? 'error' : 'success'}
          hasFeedback
        >
          <Input
            name={'firstName'}
            onChange={(e) => {
              setValue('firstName', e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </AppStyle>
  );
};

export default App;
