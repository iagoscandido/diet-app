import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";

import { colors } from "@/constants/colors";
import { Header } from "@/components/header";
import { Input } from "@/components/input";
import { Select } from "@/components/input/select";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDataStore } from "@/store/data";
import { router } from "expo-router";

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  level: z.string().min(1, { message: "selecione seu objetivo" }),
  objective: z.string().min(1, { message: "Selecione seu objetivo" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const genderOptions = [
    {
      label: "Masculino",
      value: "masculino",
    },
    {
      label: "Feminino",
      value: "feminino",
    },
  ];

  const levelOptions = [
    {
      label: "Sedentário (pouco ou nenhuma atividade física)",
      value: "Sedentário",
    },
    {
      label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
      value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
      value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    },
  ];

  const objectiveOptions = [
    { label: "Emagrecer", value: "emagrecer" },
    { label: "Hipertrofia", value: "hipertrofia" },
    { label: "Definição", value: "definição" },
    { label: "Hipertrofia + Definição", value: "hipertrofia e definição" },
  ];

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  function handleCreate(data: FormData) {
    setPageTwo({
      gender: data.gender,
      objective: data.objective,
      level: data.level,
    });
    router.push("/nutrition");
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando a dieta" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo"
          error={errors.gender?.message}
          options={genderOptions}
        ></Select>

        <Text style={styles.label}>
          Selecione o seu nivel de atividade física:
        </Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o seu nivel de atividade física"
          error={errors.level?.message}
          options={levelOptions}
        ></Select>

        <Text style={styles.label}>Selecione seu objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione o objetivo:"
          error={errors.objective?.message}
          options={objectiveOptions}
        ></Select>

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: { color: colors.white, fontWeight: "bold" },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: colors.blue,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  },
});
