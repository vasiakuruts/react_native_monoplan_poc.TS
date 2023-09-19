import React from "react";

import { View, TextInput, Button, Text } from "react-native";
import { Link } from "@react-navigation/native";

import { Formik } from "formik";
import { useLogin } from "./hooks";

export const LoginPage = ({ navigetion }: any) => {
  const Login = useLogin();
  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
          <Text>Sign in</Text>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={Login.values.username}
            onChange={Login.changeFieldValue as any}
          />
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={Login.values.password}
            onChange={Login.changeFieldValue as any}
          />
          <Button onPress={() => Login.login} title="Login" />
          <Link to={navigetion.navigate("SignupPage")} style={{}}>
            <Text>Don't have an account? Sign Up</Text>
          </Link>
        </View>
      )}
    </Formik>
  );
};

export default LoginPage;
