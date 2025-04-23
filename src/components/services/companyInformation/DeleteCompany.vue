<template>
   
            <p class="text-center mb-6 text-gray-700">
                Esta acción eliminará todos los datos relacionados cona la empresa.
            </p>
            <div class="flex justify-end gap-4">
                <button @click="deleteCompany" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Eliminar</button>
            </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { supabase } from '../DatabaseConnection';

const props = defineProps<{
  companyId: string;
}>();

const deleteCompany = async () => {
    try{
        await supabase
            .from("company_cicle")
            .delete()
            .eq("company_id", props.companyId);

        await supabase 
            .from("internship")
            .delete()
            .eq("company_id", props.companyId);
        
        const { error } = await supabase
            .from("company")
            .delete()
            .eq("id", props.companyId);
            
            if(error){
                console.error("Error al eliminar la empresa:", error);
                alert("Error al eliminar la empresa. Por favor, inténtelo de nuevo más tarde.");
                return;
            }
            alert("Empresa eliminada correctamente.");
            window.location.reload();
    }catch (err) {
        console.error("Error al eliminar la empresa:", err);
        alert("Error al eliminar la empresa. Por favor, inténtelo de nuevo más tarde.");
    }

}

</script>