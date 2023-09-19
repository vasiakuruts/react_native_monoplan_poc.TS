import React from "react";
import { View, TextInput, Button, Text } from "react-native";
import { Link } from "@react-navigation/native";

import { Formik } from "formik";
import { useSignup } from "./hooks";

export const SignupPage = ({ navigetion }: any) => {
  const { values, changeFieldValue, signup } = useSignup();

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit }) => (
        <View>
          <Text>Sign in</Text>
          <TextInput
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.username}
            onChange={changeFieldValue as any}
          />
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            onChange={changeFieldValue as any}
          />
          <TextInput
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password2}
            onChange={changeFieldValue as any}
          />
          <Button onPress={() => signup} title="Sign up" />
          <Link to={navigetion.navigate("LoginPage")} style={{}}>
            <Text>Already hanve an account? Login</Text>
          </Link>
        </View>
      )}
    </Formik>
  );
};

export default SignupPage;
