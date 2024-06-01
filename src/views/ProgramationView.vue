<template>
  <div>
    <h3>{{ $t('Manage schedule') }}</h3>
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
          field="programing_type.programing_type"
          :header="$t('program type')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column
          field="description"
          :header="$t('Description')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column
          field="km_to_travel"
          :header="$t('number of km')"
          sortable
          style="min-width: 10rem"
        ></Column>

        <Column
          field="start_time"
          :header="$t('Closing hour')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column
          field="end_time"
          :header="$t('arrival schedule')"
          sortable
          style="min-width: 10rem"
        ></Column>
        <Column field="delay" :header="$t('delay time')" sortable style="min-width: 10rem"></Column>

        <Column :exportable="false" style="min-width: 7rem">
          <template #body="slotProps">
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
      v-model:visible="productDialog"
      :style="{ width: '450px' }"
      :header="$t('schedule')"
      :modal="true"
      class="p-fluid"
    >
      <div class="field">
        <label for="inventoryStatus" class="mb-3">{{ $t('program type') }}</label>
        <Dropdown
          id="rol"
          v-model="product.type"
          :options="statuses"
          optionLabel="label"
          :placeholder="$t('select a role')"
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
      <div class="field">
        <label for="name">{{ $t('Description') }}</label>
        <Textarea
          id="description"
          v-model="product.description"
          required="true"
          rows="3"
          cols="20"
        />
      </div>
      <div class="field col">
        <label for="price">Cantidad de km</label>
        <InputNumber id="price" v-model="product.km" />
      </div>
      <div class="field">
        <label for="name">Horario de salida</label>
        <input type="time" name="horario" class="p-inputtext" v-model="product.timeout" />
      </div>
      <!-- <div id="numberSpinner">
        <button id="decrement">-</button>
        <input type="text" id="valueDisplay" readonly />
        <button id="increment">+</button>
      </div> -->

      <div class="field">
        <label for="name">Horario de llegada</label>
        <input type="time" name="horario" class="p-inputtext" v-model="product.timein" />
      </div>
      <div class="field col">
        <label for="price">Tiempo de demora</label>
        <InputNumber id="price" v-model="product.delay" />
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
          Esta seguro que desea elimar el usuario? <br /><b>
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
          Esta seguro que desea eliminar estos usuarios?<br /><b>
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
import { ProgramationService } from '@/service/ProgramationService'
import { ReportService } from '@/service/ReportService'
onMounted(() => {
  ProgramationService.get_programing(dato.token).then((data) => (products.value = data))
})

function report() {
  ReportService.get_report_programing(dato.token)
}
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
const statuses = ref()

const formatCurrency = (value) => {
  if (value) return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return
}

function load_programation() {
  ProgramationService.get_programing_type(dato.token).then((data) => {
    statuses.value = data
  })
}
const openNew = () => {
  // console.log(products)
  product.value = {}
  submitted.value = false
  productDialog.value = true
  value = true
  load_programation()
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
    console.log(
      product.value.type +
        ',' +
        product.value.description +
        ',' +
        product.value.km +
        ',' +
        product.value.timeout +
        ',' +
        product.value.timein +
        ',' +
        product.value.delay
    )
    try {
      await ProgramationService.insert_programing(
        product.value.type,
        product.value.timein,
        product.value.timeout,
        product.value.description,
        product.value.km,
        product.value.delay,
        dato.token
      )

      return ProgramationService.get_programing(dato.token)
        .then((data) => {
          products.value = data
        })
        .catch((error) => {
          console.error('Error retrieving user:', error)
        })
    } catch (error) {
      console.error('Error inserting user:', error)
    } finally {
      productDialog.value = false
    }
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

  ProgramationService.delete_prog(product.value.id, dato.token)
  ProgramationService.get_programing(dato.token).then((data) => (products.value = data))
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

<style scoped>
.field {
  margin-bottom: 1rem;
}

.p-inputtext {
  width: 100%;
}
</style>
