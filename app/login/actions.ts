"use server";

export async function handleFormSubmit(prevState: any, formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    errors: ["wrong password", "too long"],
  };
}
