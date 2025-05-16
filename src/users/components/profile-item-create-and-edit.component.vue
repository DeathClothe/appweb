<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "profile-item-create-and-edit-dialog",
  components: { CreateAndEdit },
  props: {
    item: null,
    visible: false
  },
  data() {
    return {
      submitted: false,
      profileTypes: [
        { label: 'Comprador', value: 'comprador' },
        { label: 'Vendedor', value: 'vendedor' }
      ]
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      if (this.validateForm()) {
        this.$emit('save-requested', this.item);
      }
    },
    validateForm() {
      return (
          this.item.nombre &&
          this.item.apellidos &&
          this.item.email &&
          this.item.password &&
          this.item.tipo
      );
    }
  }
}
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="Perfil"
      size="large"
      @cancel-action-requested="onCancelRequested"
      @save-action-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid grid p-4">
      <div class="field col-12 md:col-6">
        <pv-float-label>
          <pv-input-text id="nombre" v-model="item.nombre" :class="{ 'p-invalid': submitted && !item.nombre }"/>
          <label for="nombre">Nombre</label>
        </pv-float-label>
      </div>

      <div class="field col-12 md:col-6">
        <pv-float-label>
          <pv-input-text id="apellidos" v-model="item.apellidos" :class="{ 'p-invalid': submitted && !item.apellidos }"/>
          <label for="apellidos">Apellidos</label>
        </pv-float-label>
      </div>

      <div class="field col-12">
        <pv-float-label>
          <pv-input-text id="email" v-model="item.email" type="email" :class="{ 'p-invalid': submitted && !item.email }"/>
          <label for="email">Email</label>
        </pv-float-label>
      </div>

        <div class="field col-12 md:col-6">
          <pv-float-label>
            <pv-password
                id="password"
                v-model="item.password"
                toggleMask
                :feedback="false"
                :class="{ 'p-invalid': submitted && !item.password }"
                class="w-full"
            />
            <label for="password">Contraseña</label>
            <small v-if="submitted && !item.password" class="p-error">La contraseña es requerida</small>
          </pv-float-label>
        </div>

      <div class="field col-12 md:col-6">
        <pv-float-label>
          <pv-input-text id="direccion" v-model="item.direccion"/>
          <label for="direccion">Dirección</label>
        </pv-float-label>
      </div>

        <div class="field col-12 md:col-6">
          <pv-float-label>
            <pv-dropdown
                id="tipo"
                v-model="item.tipo"
                :options="profileTypes"
                optionLabel="label"
                optionValue="value"
                :class="{ 'p-invalid': submitted && !item.tipo }"
                class="w-full"
            />
            <label for="tipo">Tipo de Usuario</label>
            <small v-if="submitted && !item.tipo" class="p-error">Selecciona un tipo</small>
          </pv-float-label>
        </div>
    </div>
  </template>
  </create-and-edit>
</template>

<style scoped>
.p-fluid .field {
  width: 100%;
}

.field {
  margin-bottom: 1.5rem;
}

.p-error {
  color: #f44336;
  font-size: 0.75rem;
}
</style>