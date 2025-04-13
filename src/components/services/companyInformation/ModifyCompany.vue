<template>
    <body>
    <div>
        <div>
            <h3>Nuevos datos de la empresa:</h3>

            <div><button><img src="/src/assets/x-square.svg"></button></div>
            <form>
                <div>
                <label for="companyName">Nombre:</label>
                <input v-model="form.name" type="text" name="companyName" placeholder="Nuevo nombre de la empresa"><br/>
                </div>
                <div>
                <label for="companyAddress">Dirección:</label>
                <input v-model="form.address" type="text" name="companyAddress" placeholder="Nueva dirección de la empresa"><br/>
                </div>
                <div>
                <label for="companyCIF">CIF:</label>
                <input v-model="form.cif" type="text" name="companyCIF" placeholder="Nuevo CIF de la empresa"><br/>
                </div>
                <div>
                <label for="companyAvailability">Disponibilidad:</label>
                <input v-model="form.availability" type="text" name="companyAvailability" placeholder="Sí/No"><br/>
                </div>
                <div>
                <label for="companyPhone">Teléfono:</label>
                <input v-model="form.phone" type="text" name="companyPhone" placeholder="Nuevo teléfono de la empresa"><br/>
                </div>
                <div>
                <label for="companyE">E-mail:</label>
                <input v-model="form.email" type="text" name="companyE-mail" placeholder="Nuevo email de la empresa"><br/>
                </div>
                <div>
                <label for="companyModality">Modalidad:</label>
                <input v-model="form.modality" type="text" name="companyModality" placeholder="Modalidades de la empresa"><br/>
                </div>
                <div>
                <label for="companyCycles">Ciclos compatibles:</label>
                <input v-model="form.cycles" type="text" name="companyCycles" placeholder="Ciclos de la empresa"><br/>
                </div>

                <div>
                    <button type="submit">Aceptar</button>
                </div>
            </form>
        </div>
    </div>
    </body>

</template>

<script lang="ts" setup>
 import { ref, watch } from 'vue';
 import { supabase } from '../DatabaseConnection';

 const props = defineProps<{
    companyId: string;
    companyData: any;
 }>();

 const emit = defineEmits(["close", "update"]);
 const form = ref ({...props.companyData});

 watch(
    () => props.companyData,
    (newVal) => {
        form.value = {...newVal };
    }
 )

 const updateDataCompany = async () => {
    const { error } = await supabase 
        .from("company")
        .update({
            name: form.value.name,
            address: form.value.address,
            cif: form.value.cif,
            availability: form.value.availability,
            phone: form.value.phone,
            email: form.value.email,
            modality: form.value.modality,
            cycles: form.value.cycles
        })
        .eq("id", props.companyId);

        if(error) {
            alert("Error al actualizar");
            return;
        }
    
        emit("update");
        emit("close");
 }

</script>
