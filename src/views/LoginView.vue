<script setup lang="ts">
import { LoginService } from '@/service/LoginService'
import { onMounted } from 'vue'
// import { isConstructorDeclaration } from 'typescript'
import { useRouter } from 'vue-router'
const router = useRouter()
// import { createStore } from 'vuex'

onMounted(() => {
  localStorage.setItem('language', 'ES')
})

let mail = ''
let password = ''

async function login() {
  try {
    const data = await LoginService.login(mail, password)
    console.log(data)
    localStorage.setItem('user_data', JSON.stringify(data))

    router.push('/home')
  } catch (error) {
    console.error('Login failed:', (error as Error).message)
  }
  //   else this.errorAlert = true
}
</script>

<template>
  <section id="wrapper" class="new-login-register">
    <div class="lg-info-panel">
      <div class="inner-panel">
        <a href="javascript:void(0)" class="p-20 di">
          <!-- <img src="../assets/plugins/images/admin-logo.png"
        /> -->
        </a>
        <div class="lg-content">
          <h1 style="color: white">CUBATOUR</h1>
          <p class="text-muted" style="font-size: 20px">Donde cada viaje es una historia</p>
        </div>
      </div>
    </div>
    <div class="new-login-box">
      <div class="white-box">
        <h3 class="box-title m-b-0">Inserte sus datos para autenticarse</h3>

        <form class="form-horizontal new-lg-form" @submit.prevent="login" id="loginform">
          <div class="form-group m-t-20">
            <div class="col-xs-12">
              <label>Dirección de correo</label>
              <input class="form-control" type="text" required v-model="mail" />
            </div>
          </div>
          <div class="form-group">
            <div class="col-xs-12">
              <label>Contraseña</label>
              <input class="form-control" type="password" required v-model="password" />
            </div>
          </div>
          <div class="form-group"></div>
          <div class="form-group text-center m-t-20">
            <div class="col-xs-12">
              <button
                class="btn btn-info btn-lg btn-block btn-rounded text-uppercase waves-effect waves-light"
                type="submit"
              >
                autenticarse
              </button>
            </div>
          </div>

          <div class="form-group m-b-0">
            <div class="col-sm-12 text-center"></div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
