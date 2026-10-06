import { Pressable, PressableProps, StyleSheet, Text } from "react-native";

interface Props extends PressableProps {
  children: string;
}

const ThemedPressable = ({ children, ...rest }: Props) => {
  return (
    <Pressable style={Styles.btnPrimary} {...rest}>
      <Text style={{ color: "white" }}>{children}</Text>
    </Pressable>
  );
};

export default ThemedPressable;

const Styles = StyleSheet.create({
  btnPrimary: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    margin: 10,
  },
});
