<script setup lang="ts">
import { toast } from "vue3-toastify";
import {
  useDeleteUserTypes,
  useListUserTypes,
  useUpdateUserTypes,
} from "~/hooks/userTypes";

const { data: userList, refresh } = await useListUserTypes();

const userTypesUIState = reactive({
  radioButtonViewModel: userList.value?.data.find(p => p.isDefault)?.id,
  isLoading: false,
  shouldShowDeleteDialog: false,
});

const deleteUser = async (value: string) => {
  userTypesUIState.shouldShowDeleteDialog = false;
  userTypesUIState.isLoading = true;
  const { error } = await useDeleteUserTypes(value);
  if (!error.value) {
    toast("Tipo de Usuario Eliminado con Exito!", {
      theme: "colored",
      type: "success",
      dangerouslyHTMLString: true,
    });
    refresh();
    userTypesUIState.shouldShowDeleteDialog = false;
    userTypesUIState.isLoading = false;
  } else {
    userTypesUIState.shouldShowDeleteDialog = false;
    toast("Error, Intenta Nuevamente!", {
      theme: "colored",
      type: "error",
      dangerouslyHTMLString: true,
    });
  }
};

watch(
  () => userTypesUIState.radioButtonViewModel,
  async (value) => {
    userTypesUIState.isLoading = true;
    const currentUserType = userList.value?.data.find(p => p.isDefault)
    await useUpdateUserTypes({
      id: currentUserType?.id,
      name: currentUserType?.name ||"",
      isDefault: false,
    });
    const { error } = await useUpdateUserTypes({
      id: value || "",
      name: userList.value?.data.find((c) => c.id == value)?.name || "",
      isDefault: true,
    });
    if (error.value) {
      toast("Error, Intenta Nuevamente!", {
        theme: "colored",
        type: "error",
        dangerouslyHTMLString: true,
      });
    }
    userTypesUIState.isLoading = false;
  }
);
</script>
<template>
  <loading :isLoading="userTypesUIState.isLoading" />
  <div>
    <div class="grid grid-cols-3 py-6 font-bold">
      <span>Tipo de Usuario</span>
      <span>Por Defecto</span>
      <span>Accion</span>
    </div>
    <v-radio-group
      class="grid grid-cols-3 space-x-2 divide-y-2 divide-gray-200"
      v-model="userTypesUIState.radioButtonViewModel"
      v-for="(item, index) in userList?.data"
    >
      <div class="grid grid-cols-3 items-center my-2">
        <span>{{ item.name }}</span>
        <span><v-radio :value="item.id"></v-radio></span>
        <div>
          <button
            @click="userTypesUIState.shouldShowDeleteDialog = true"
            class="text-red-600 flex gap-2 bg-red-100 rounded-lg py-3 px-4 shadow-sm"
          >
            <v-icon size="large">mdi-close-circle</v-icon>
            <span class="font-bold">Eliminar </span>
          </button>
          <v-dialog
            v-model="userTypesUIState.shouldShowDeleteDialog"
            class="flex"
          >
            <div
              class="bg-white w-2/6 h-auto m-auto gap-6 rounded-lg shadow-lg flex flex-col p-8"
            >
              <span class="flex gap-4 items-center text-red-600 py-1">
                <v-icon size="x-large">mdi mdi-alert</v-icon>
                <span class="text-3xl text-black font-bold"
                  >Eliminar Tipo de Usuario</span
                >
              </span>
              <div class="border border-gray-200"></div>
              <span
                >¿Estas seguro que quieres eliminar de la base de datos el tipo
                de usuario?</span
              >
              <div class="border border-gray-200"></div>
              <div class="flex gap-3">
                <button
                  @click="userTypesUIState.shouldShowDeleteDialog = false"
                  class="ml-auto bg-gray-200 text-black px-6 py-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  @click="deleteUser(item.id?.toString() || '')"
                  class="bg-red-600 text-white px-6 py-4 rounded-lg"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </v-dialog>
        </div>
      </div>
    </v-radio-group>
  </div>
</template>
