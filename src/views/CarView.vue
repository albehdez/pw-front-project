<template>
  <div>
    <h3>Gestionar vehículos</h3>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            label="Agregar"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNew"
            style="color: white"
          />
          <Button
            label="Eliminar"
            icon="pi pi-trash"
            severity="danger"
            @click="confirmDeleteSelected"
            :disabled="!selectedProducts || !selectedProducts.length"
            style="color: white"
          />
        </template>

        <template #end>
          <Button
            label="Exportar"
            icon="pi pi-upload"
            severity="help"
            @click="prueba(2)"
            style="color: white"
          />
        </template>
      </Toolbar>
      <br />
      <DataTable
        ref="dt"
        :value="products"
        v-model:selection="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="5"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Buscar..." />
            </IconField>
          </div>
        </template>

        <Column
          selectionMode="multiple"
          style="width: 3rem; margin: 5rem"
          :exportable="false"
        ></Column>
        <Column field="license_plate" header="Código" sortable style="min-width: 8rem"></Column>
        <Column field="brand" header="Marca" sortable style="min-width: 10rem"></Column>
        <Column
          field="car_situation.type_situation"
          header="Situación"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column
          field="number_seats"
          header="Numero de asientos"
          sortable
          style="min-width: 16rem"
        ></Column>
        <Column
          field="km_available"
          header="kilómetros recorridos"
          sortable
          style="min-width: 16rem"
        ></Column>
        <Column :exportable="false" header="Hoja de ruta">
          <template #body="slotProps"
            ><Button
              label="mostrar"
              icon="pi pi-table"
              @click="(dialogVisible1 = true), (roadmap = slotProps.data)"
              style="color: white"
            />
          </template>
          /></Column
        >
        <Column :exportable="false" style="min-width: 7rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
              style="color: green"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
              style="color: red"
            />
          </template>
        </Column>
      </DataTable>
    </div>

    <Dialog
      v-model:visible="dialogVisible1"
      header="Hoja de Ruta"
      :style="{ width: '75vw' }"
      maximizable
      modal
      :contentStyle="{ height: '300px' }"
    >
      <DataTable :value="customers" scrollable scrollHeight="flex" tableStyle="min-width: 50rem">
        <Column field="viaje" header="Destino"></Column>
        <Column field="country.name" header="kilometraje inicial"></Column>
        <Column field="representative.name" header="kilometraje finales"></Column>
        <!-- <Column field="company" header="Company"></Column> -->
      </DataTable>
      <template #footer>
        <!-- <Button label="Ok" icon="pi pi-check" @click="dialogVisible = false" /> -->
      </template>
    </Dialog>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Vehículo"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Código</label>
        <InputText
          id="name"
          v-model.trim="product.license_plate"
          required="true"
          @click="console.log(product.license_plate)"
          autofocus
          :invalid="submitted && !product.license_plate"
        />
        <small class="p-error" v-if="submitted && !product.name">El código es requerido.</small>
      </div>
      <div class="field">
        <label for="description">Marca</label>
        <InputText
          id="name"
          v-model.trim="product.brand"
          required="true"
          autofocus
          :invalid="submitted && !product.name"
        />
        <!-- <Textarea
          id="description"
          v-model="product.description"
          required="true"
          rows="3"
          cols="20"
        /> -->
      </div>

      <div class="field">
        <label for="inventoryStatus" class="mb-3">Situación</label>
        <Dropdown
          id="inventoryStatus"
          v-model="product.type_situation"
          :options="statuses"
          optionLabel="label"
          placeholder="seleccione una situación"
        >
          <template #value="slotProps">
            <div v-if="slotProps.value && slotProps.value.value">
              <Tag
                :value="slotProps.value.value"
                :severity="getStatusLabel(slotProps.value.label)"
              />
            </div>
            <div v-else-if="slotProps.value && !slotProps.value.value">
              <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
        </Dropdown>
      </div>

      <!-- <div class="field">
        <label class="mb-3">Category</label>
        <div class="formgrid grid">
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category1"
              name="category"
              value="Accessories"
              v-model="product.category"
            />
            <label for="category1">Accessories</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category2"
              name="category"
              value="Clothing"
              v-model="product.category"
            />
            <label for="category2">Clothing</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category3"
              name="category"
              value="Electronics"
              v-model="product.category"
            />
            <label for="category3">Electronics</label>
          </div>
          <div class="field-radiobutton col-6">
            <RadioButton
              id="category4"
              name="category"
              value="Fitness"
              v-model="product.category"
            />
            <label for="category4">Fitness</label>
          </div>
        </div>
      </div> -->

      <div class="formgrid grid">
        <!-- <div class="field col">
          <label for="price">Price</label>
          <InputNumber
            id="price"
            v-model="product.price"
            mode="currency"
            currency="USD"
            locale="en-US"
          />
        </div> -->
        <div class="field col">
          <label for="quantity">Cantidad de Asientos</label>
          <InputNumber id="quantity" v-model="product.number_seats" integeronly />
        </div>
        <div class="field col" v-if="value">
          <label for="quantity">Kilómetros recorridos</label>
          <InputNumber id="quantity" v-model="product.km_available" integeronly />
        </div>
      </div>
      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Aceptar" icon="pi pi-check" text @click="saveProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">
          Esta seguro que desea elimar el vehículo con código {{ product.license_plate }}? <br /><b>
            Esta acción no padra deshacerse</b
          ></span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductDialog = false" />
        <Button label="Sí" icon="pi pi-check" text @click="deleteProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirmar"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">
          Esta seguro que desea eliminar estos vehículos?<br /><b>
            Esta acción no padra deshacerse</b
          ></span
        >
      </div>
      <template #footer>
        <Button label="No" icon="pi pi-times" text @click="deleteProductsDialog = false" />
        <Button label="Sí" icon="pi pi-check" text @click="deleteSelectedProducts" />
      </template>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { FilterMatchMode } from 'primevue/api'
import { useToast } from 'primevue/usetoast'
import { CarService } from '@/service/CarService'

onMounted(() => {
  CarService.get_cars(dato.token).then((data) => (products.value = data))
})

let roadmap
const dato = JSON.parse(localStorage.getItem('user_data') || '{}')
let value = 'false'
const dialogVisible1 = ref(false)
const toast = useToast()
const dt = ref()
let products = ref()
const productDialog = ref(false)
const deleteProductDialog = ref(false)
const deleteProductsDialog = ref(false)
const product = ref({})
const selectedProducts = ref()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
})
const submitted = ref(false)
const statuses = ref([
  { label: 'INSTOCK', value: 'Inside' },
  { label: 'LOWSTOCK', value: 'lowstock' },
  { label: 'OUTOFSTOCK', value: 'outofstock' }
])

const formatCurrency = (value) => {
  if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return
}
const openNew = () => {
  // console.log(products)
  product.value = {}
  submitted.value = false
  productDialog.value = true
  value = true
}
const hideDialog = () => {
  productDialog.value = false
  submitted.value = false
}
const saveProduct = async () => {
  submitted.value = true

  // if (product?.value.name?.trim()) {
  //   if (product.value.id) {
  //     product.value.inventoryStatus = product.value.inventoryStatus.value
  //       ? product.value.inventoryStatus.value
  //       : product.value.inventoryStatus
  //     products.value[findIndexById(product.value.id)] = product.value
  //     toast.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Updated',
  //       life: 3000
  //     })
  //   } else {
  //     product.value.id = createId()
  //     product.value.code = createId()
  //     product.value.inventoryStatus = product.value.inventoryStatus
  //       ? product.value.inventoryStatus.value
  //       : 'INSTOCK'
  //     products.value.push(product.value)
  //     toast.add({
  //       severity: 'success',
  //       summary: 'Successful',
  //       detail: 'Product Created',
  //       life: 3000
  //     })
  //   }

  if (value) {
    await CarService.insert_car(
      product.value.brand,
      product.value.number_seats,
      product.value.km_available,
      product.value.license_plate,
      product.value.type_situation.value,
      dato.token
    )
    return CarService.get_cars(dato.token).then((data) => {
      products.value = data
      console.log('User retrieved successfully', data)
    })
  } else {
  }
  CarService.get_cars(dato.token).then((data) => {
    products.value = data
  }),
    (productDialog.value = false)
  // product.value = {}
  // }
}
const editProduct = (prod) => {
  value = false
  product.value = { ...prod }
  productDialog.value = true
}
const confirmDeleteProduct = (prod) => {
  product.value = prod
  deleteProductDialog.value = true
}
const deleteProduct = () => {
  // products.value = products.value.filter((val) => val.id !== product.value.id)
  // console.log(product.value.filter(val))
  // deleteProductDialog.value = false
  // console.log('paso')
  // product.value = {}
  // toast.add({
  //   severity: 'success',
  //   summary: 'Successful',
  //   detail: 'Product Deleted',
  //   life: 3000
  // })
  // console.log(product.value.id)
  CarService.delete_car(product.value.id, dato.token)
  // CarService.get_cars(dato.token).then((data) => (products.value = data))
}
const findIndexById = (id) => {
  let index = -1
  for (let i = 0; i < products.value.length; i++) {
    if (products.value[i].id === id) {
      index = i
      break
    }
  }

  return index
}
const createId = () => {
  let id = ''
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}
const exportCSV = () => {
  dt.value.exportCSV()
}
const confirmDeleteSelected = () => {
  deleteProductsDialog.value = true
}
const deleteSelectedProducts = () => {
  products.value = products.value.filter((val) => !selectedProducts.value.includes(val))
  deleteProductsDialog.value = false
  selectedProducts.value = null
  toast.add({
    severity: 'success',
    summary: 'Successful',
    detail: 'Products Deleted',
    life: 3000
  })
}

const getStatusLabel = (status) => {
  switch (status) {
    case 'INSTOCK':
      return 'inside'

    case 'LOWSTOCK':
      return 'warning'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
</script>

<style scoped></style>
