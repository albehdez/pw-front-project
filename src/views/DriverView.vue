<template>
  <div>
    <h3>{{ $t('manage drivers') }}</h3>
    <div class="card">
      <Toolbar class="mb-4">
        <template #start>
          <Button
            :label="$t('add')"
            icon="pi pi-plus"
            severity="success"
            class="mr-2"
            @click="openNew"
            style="color: white"
          />
          <Button
            :label="$t('export')"
            icon="pi pi-upload"
            severity="help"
            @click="report()"
            style="color: white"
          />
        </template>

        <template #end>
          <div class="flex flex-wrap gap-2 align-items-center justify-content-between">
            <IconField iconPosition="left">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" :placeholder="$t('search')" />
            </IconField>
          </div>
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
        currentPageReportTemplate=" "
      >
        <Column
          field="identify_card"
          header="número de identidad"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column field="name" :header="$t('name')" sortable style="min-width: 15rem"></Column>

        <Column field="address" :header="$t('address')" sortable style="min-width: 10rem"></Column>
        <Column
          field="driver_situation.type_situation"
          :header="$t('situation')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column
          field="driver_category.type_category"
          :header="$t('category')"
          sortable
          style="min-width: 5rem"
        ></Column>
        <Column
          field="{{   car.permanent_car!=null ? car.permanent_car : '-' }}"
          :header="$t('assigned car')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column :exportable="false" style="min-width: 7rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              squared
              class="mr-2"
              @click="editProduct(slotProps.data)"
              style="color: green"
            />
            <Button
              icon="pi pi-trash"
              outlined
              squared
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
      :closable="false"
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      header="Conductor"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="name">Numero de identidad</label>
        <InputText
          id="name"
          v-model.trim="product.license_plate"
          required="true"
          @click="console.log(product.license_plate)"
          autofocus
          :invalid="submitted && !product.identify_card"
        />
        <small class="p-error" v-if="submitted && !product.name">El código es requerido.</small>
      </div>
      <div class="field">
        <label for="description">Nombre</label>
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
        <label for="inventoryStatus" class="mb-3">Categoría</label>
        <Dropdown
          id="inventoryStatus"
          v-model="product.type_situation"
          :options="statuses"
          optionLabel="label"
          placeholder="seleccione una categoría"
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
        <label for="inventoryStatus" class="mb-3">Carro asignado</label>
        <Dropdown
          id="inventoryStatus"
          v-model="product.type_situation"
          :options="statuses"
          optionLabel="label"
          placeholder="seleccione un carro asignado"
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
          <label for="quantity">Dirección</label>
          <InputText
            id="name"
            v-model.trim="product.number_seats"
            required="true"
            autofocus
            :invalid="submitted && !product.identify_card"
          />
        </div>
      </div>
      <template #footer>
        <Button :label="$t('cancel')" icon="pi pi-times" text @click="hideDialog" />
        <Button :label="$t('acept')" icon="pi pi-check" text @click="saveProduct" />
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
import { DriverService } from '@/service/DriverService'
import { ReportService } from '@/service/ReportService'
onMounted(() => {
  DriverService.get_driver(dato.token).then((data) => (products.value = data))
  // console.log(products)
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
const statuses = ref([])
const category = ref([])
const cars = ref([])

const load_status = () => {
  DriverService.get_driver_status(dato.token).then((data) => (statuses.value = data))
}

const load_categories = () => {
  DriverService.get_driver_categories(dato.token).then((data) => (category.value = data))
}
const load_cars = () => {
  DriverService.get_driver_cars(dato.token).then((data) => (cars.value = data))
}

const report = () => {
  ReportService.get_report_driver(dato.token)
}

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
    await DriverService.insert_driver(
      product.value.brand,
      product.value.number_seats,
      product.value.km_available,
      product.value.license_plate,
      product.value.type_situation.value,
      dato.token
    )
    return CarService.get_cars(dato.token).then((data) => (products.value = data))
    productDialog.value = false
  } else {
  }
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

  CarService.delete_car(product.value.id, dato.token)
  CarService.get_cars(dato.token).then((data) => (products.value = data))
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
const getCarInfo = (carData) => {
  return carData.permanent_car === null ? '-' : carData.permanent_car
}
</script>

<style scoped></style>
