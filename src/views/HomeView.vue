<script setup>
import { ref } from 'vue'
const product = null
const dato = JSON.parse(localStorage.getItem('user_data') || '{}')
let name = dato.name
let page_title = 'prueba'
const dialogVisible1 = ref(false)
function changeLanguage(language) {
  localStorage.setItem('language', language)
  console.log(localStorage.getItem('language'))
  window.location.reload()
}
</script>
<template>
  <body class="fix-header">
    <div id="wrapper">
      <!-- ============================================================== -->
      <!-- Topbar header - style you can find in pages.scss -->
      <!-- ============================================================== -->
      <nav class="navbar navbar-default navbar-static-top m-b-0">
        <div class="navbar-header">
          <div class="top-left-part">
            <!-- Logo -->
            <!-- <a class="logo" href="index.html"> -->
            <!-- Logo icon image, you can use font-icon also -->
            <!-- <b> -->

            <!--This is dark logo icon-->
            <!-- <img
                  src="../assets/plugins/images/admin-logo.png"
                  alt="home"
                  class="dark-logo"
                />This is light logo icon -->
            <!-- <img
                  src="../plugins/images/admin-logo-dark.png"
                  alt="home"
                  class="light-logo"
                /> -->
            <!-- </b> -->
            <!-- Logo text image you can use text also -->
            <!-- <span class="hidden-xs"> -->
            <!--This is dark logo text-->
            <!-- <img src="../assets/plugins/images/admin-text.png" alt="home" class="dark-logo" /> -->
            <!--This is light logo text-->
            <!-- <img
                src="../plugins/images/admin-text-dark.png"
                alt="home"
                class="light-logo"
              />
            </span> -->
            <!-- </a> -->
          </div>
          <!-- /Logo -->
          <!-- Search input and Toggle icon -->
          <ul class="nav navbar-top-links navbar-left">
            <li>
              <a href="javascript:void(0)" class="open-close waves-effect waves-light visible-xs"
                ><i class="ti-close ti-menu"></i
              ></a>
            </li>
            <li>
              <!-- <p class="name_bussines"><strong>CUBA</strong>TOUR</p> -->
            </li>
            <!-- <li class="dropdown">
              <ul class="dropdown-menu mailbox animated bounceInDown">
                <li>
                  <div class="drop-title">You have 4 new messages</div>
                </li>
                <li>
                  <div class="message-center">
                    <a href="#">
                      <div class="user-img">
                        <img
                          src="../plugins/images/users/pawandeep.jpg"
                          alt="user"
                          class="img-circle"
                        />
                        <span class="profile-status online pull-right"></span>
                      </div>
                      <div class="mail-contnet">
                        <h5>Pavan kumar</h5>
                        <span class="mail-desc">Just see the my admin!</span>
                        <span class="time">9:30 AM</span>
                      </div>
                    </a>
                    <a href="#">
                      <div class="user-img">
                        <img src="../plugins/images/users/sonu.jpg" alt="user" class="img-circle" />
                        <span class="profile-status busy pull-right"></span>
                      </div>
                      <div class="mail-contnet">
                        <h5>Sonu Nigam</h5>
                        <span class="mail-desc">I've sung a song! See you at</span>
                        <span class="time">9:10 AM</span>
                      </div>
                    </a>
                    <a href="#">
                      <div class="user-img">
                        <img
                          src="../plugins/images/users/arijit.jpg"
                          alt="user"
                          class="img-circle"
                        />
                        <span class="profile-status away pull-right"></span>
                      </div>
                      <div class="mail-contnet">
                        <h5>Arijit Sinh</h5>
                        <span class="mail-desc">I am a singer!</span>
                        <span class="time">9:08 AM</span>
                      </div>
                    </a>
                    <a href="#">
                      <div class="user-img">
                        <img
                          src="../plugins/images/users/pawandeep.jpg"
                          alt="user"
                          class="img-circle"
                        />
                        <span class="profile-status offline pull-right"></span>
                      </div>
                      <div class="mail-contnet">
                        <h5>Pavan kumar</h5>
                        <span class="mail-desc">Just see the my admin!</span>
                        <span class="time">9:02 AM</span>
                      </div>
                    </a>
                  </div>
                </li>
                <li>
                  <a class="text-center" href="javascript:void(0);">
                    <strong>See all notifications</strong> <i class="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul>
              <!-- /.dropdown-messages -->
            <!-- </li> -->

            <!-- .Task dropdown -->
            <li class="dropdown">
              <ul class="dropdown-menu dropdown-tasks animated slideInUp">
                <li>
                  <a href="#">
                    <div>
                      <p>
                        <strong>Task 1</strong>
                        <span class="pull-right text-muted">40% Complete</span>
                      </p>
                      <div class="progress progress-striped active">
                        <div
                          class="progress-bar progress-bar-success"
                          role="progressbar"
                          aria-valuenow="40"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: 40%"
                        >
                          <span class="sr-only">40% Complete (success)</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="#">
                    <div>
                      <p>
                        <strong>Task 2</strong>
                        <span class="pull-right text-muted">20% Complete</span>
                      </p>
                      <div class="progress progress-striped active">
                        <div
                          class="progress-bar progress-bar-info"
                          role="progressbar"
                          aria-valuenow="20"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: 20%"
                        >
                          <span class="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="#">
                    <div>
                      <p>
                        <strong>Task 3</strong>
                        <span class="pull-right text-muted">60% Complete</span>
                      </p>
                      <div class="progress progress-striped active">
                        <div
                          class="progress-bar progress-bar-warning"
                          role="progressbar"
                          aria-valuenow="60"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: 60%"
                        >
                          <span class="sr-only">60% Complete (warning)</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a href="#">
                    <div>
                      <p>
                        <strong>Task 4</strong>
                        <span class="pull-right text-muted">80% Complete</span>
                      </p>
                      <div class="progress progress-striped active">
                        <div
                          class="progress-bar progress-bar-danger"
                          role="progressbar"
                          aria-valuenow="80"
                          aria-valuemin="0"
                          aria-valuemax="100"
                          style="width: 80%"
                        >
                          <span class="sr-only">80% Complete (danger)</span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
                <li class="divider"></li>
                <li>
                  <a class="text-center" href="#">
                    <strong>See All Tasks</strong> <i class="fa fa-angle-right"></i>
                  </a>
                </li>
              </ul>
            </li>
            <!-- .Megamenu -->
            <li class="mega-dropdown">
              <ul class="dropdown-menu mega-dropdown-menu animated bounceInDown">
                <li class="col-sm-3">
                  <ul>
                    <li class="dropdown-header">Forms Elements</li>
                    <li><a href="form-basic.html">Basic Forms</a></li>
                    <li><a href="form-layout.html">Form Layout</a></li>
                    <li><a href="form-advanced.html">Form Addons</a></li>
                    <li><a href="form-material-elements.html">Form Material</a></li>
                    <li><a href="form-float-input.html">Form Float Input</a></li>
                    <li><a href="form-upload.html">File Upload</a></li>
                    <li><a href="form-mask.html">Form Mask</a></li>
                    <li><a href="form-img-cropper.html">Image Cropping</a></li>
                    <li><a href="form-validation.html">Form Validation</a></li>
                  </ul>
                </li>
                <li class="col-sm-3">
                  <ul>
                    <li class="dropdown-header">Advance Forms</li>
                    <li><a href="form-dropzone.html">File Dropzone</a></li>
                    <li><a href="form-pickers.html">Form-pickers</a></li>
                    <li><a href="form-wizard.html">Form-wizards</a></li>
                    <li><a href="form-typehead.html">Typehead</a></li>
                    <li><a href="form-xeditable.html">X-editable</a></li>
                    <li><a href="form-summernote.html">Summernote</a></li>
                    <li><a href="form-bootstrap-wysihtml5.html">Bootstrap wysihtml5</a></li>
                    <li><a href="form-tinymce-wysihtml5.html">Tinymce wysihtml5</a></li>
                  </ul>
                </li>
                <li class="col-sm-3">
                  <ul>
                    <li class="dropdown-header">Table Example</li>
                    <li><a href="basic-table.html">Basic Tables</a></li>
                    <li><a href="table-layouts.html">Table Layouts</a></li>
                    <li><a href="data-table.html">Data Table</a></li>
                    <li><a href="bootstrap-tables.html">Bootstrap Tables</a></li>
                    <li><a href="responsive-tables.html">Responsive Tables</a></li>
                    <li><a href="editable-tables.html">Editable Tables</a></li>
                    <li><a href="foo-tables.html">FooTables</a></li>
                    <li><a href="jsgrid.html">JsGrid Tables</a></li>
                  </ul>
                </li>
                <li class="col-sm-3">
                  <ul>
                    <li class="dropdown-header">Charts</li>
                    <li><a href="flot.html">Flot Charts</a></li>
                    <li><a href="morris-chart.html">Morris Chart</a></li>
                    <li><a href="chart-js.html">Chart-js</a></li>
                    <li><a href="peity-chart.html">Peity Charts</a></li>
                    <li><a href="knob-chart.html">Knob Charts</a></li>
                    <li><a href="sparkline-chart.html">Sparkline charts</a></li>
                    <li><a href="extra-charts.html">Extra Charts</a></li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <ul class="nav navbar-top-links navbar-right pull-right">
            <li class="in"></li>
            <li>
              <a
                @click="dialogVisible1 = true"
                class="dropdown-toggle waves-effect waves-light"
                data-toggle="dropdown"
                href="#"
              >
                <i class="pi pi-language"></i>
              </a>
            </li>
            <li class="dropdown">
              <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#">
                <!-- <img
                  src="../assets/plugins/images/users/varun.jpg"
                  alt="user-img"
                  width="36"
                  class="img-circle"
                /> -->
                <b class="hidden-xs"></b>
                <Avatar
                  icon="pi pi-user"
                  style="background-color: #dee9fc; color: #1a2551"
                  shape="circle"
                />
                <p>{{ $t('gretting') }}, {{ dato.name }}</p>
              </a>
              <ul class="dropdown-menu dropdown-user">
                <li></li>
                <li>
                  <a href="#"
                    ><i class="fa fa-power-off"></i
                    ><RouterLink to="/" style="color: black"> {{ $t('Sign off') }}</RouterLink>
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
      <div class="navbar-default sidebar" role="navigation">
        <div class="sidebar-nav slimscrollsidebar">
          <div class="sidebar-head">
            <h3>
              <span class="fa-fw open-close"
                ><i class="ti-menu hidden-xs"></i><i class="ti-close visible-xs"></i
              ></span>
              <span class="hide-menu"><strong>CUBA</strong>TOUR</span>
            </h3>
          </div>
          <ul class="nav" id="side-menu">
            <li class="user-pro">
              <ul class="nav nav-second-level collapse" aria-expanded="false" style="height: 0px">
                <li>
                  <a href="javascript:void(0)"
                    ><i class="ti-user"></i> <span class="hide-menu">My Profile</span></a
                  >
                </li>
                <li>
                  <a href="javascript:void(0)"
                    ><i class="ti-wallet"></i> <span class="hide-menu">My Balance</span></a
                  >
                </li>
                <li>
                  <a href="javascript:void(0)"
                    ><i class="ti-email"></i> <span class="hide-menu">Inbox</span></a
                  >
                </li>
                <li>
                  <a href="javascript:void(0)"
                    ><i class="ti-settings"></i> <span class="hide-menu">Account Setting</span></a
                  >
                </li>
                <li>
                  <a href="javascript:void(0)"
                    ><i class="fa fa-power-off"></i> <span class="hide-menu">Logout</span></a
                  >
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="waves-effect"
                ><i class="pi pi-pen-to-square"></i>
                <span class="hide-menu">
                  {{ $t('management-section') }}<span class="fa arrow"></span> </span
              ></a>
              <ul class="nav nav-second-level">
                <li>
                  <a class="active"
                    ><i class="pi pi-list"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/request">{{ $t('request-option') }}</RouterLink></span
                    ></a
                  >
                </li>
                <li>
                  <a class="active"
                    ><i class="pi pi-users"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/group">{{ $t('groups-option') }}</RouterLink></span
                    ></a
                  >
                </li>
                <li>
                  <a
                    ><i class="pi pi-car"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/car">{{ $t('vehicle-option') }}</RouterLink></span
                    ></a
                  >
                </li>
                <li>
                  <a class="active"
                    ><i class="pi pi-user"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/driver">{{ $t('drivers-option') }}</RouterLink></span
                    ></a
                  >
                </li>

                <li>
                  <a class="active"
                    ><i class="pi pi-map"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/programation">{{
                        $t('programations-option')
                      }}</RouterLink></span
                    ></a
                  >
                </li>
              </ul>
            </li>
            <li class="devider"></li>
            <li v-if="dato.role == 'Admin'">
              <a href="#" class="waves-effect"
                ><i class="pi pi-cog"></i>
                <span class="hide-menu">
                  {{ $t('administration-section') }}<span class="fa arrow"></span> </span
              ></a>
              <ul class="nav nav-second-level">
                <li>
                  <a
                    ><i class="pi pi-user-edit"></i>
                    <span class="hide-menu"
                      ><RouterLink to="/home/user">{{ $t('users-option') }}</RouterLink></span
                    ></a
                  >
                </li>
                <li class="devider"></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div id="page-wrapper">
        <div class="container-fluid">
          <!-- <div class="row bg-title">
            <div class="col-lg-3 col-md-4 col-sm-4 col-xs-12">
              <h4 class="page-title">{{ page_title }}</h4>
            </div>
          </div> -->
          <RouterView></RouterView>
          <Dialog
            v-model:visible="dialogVisible1"
            :header="$t('language-title')"
            :style="{ width: '20vw' }"
            modal
            :closable="false"
            :contentStyle="{ height: '110px' }"
          >
            <div style="align-content: center; margin-left: 29%">
              <button @click="changeLanguage('EN')">
                <img
                  src="../assets/banderas/usa.svg"
                  style="width: 35px; height: 30px; border-radius: 7px"
                />
                English
              </button>
              <br />
              <button @click="changeLanguage('ES')">
                <img src="../assets/banderas/spain.svg" /> Español
              </button>
            </div>
            <template #footer>
              <Button :label="$t('cancel')" icon="pi pi-times" text @click="dialogVisible1 = false" />
        
            </template>
          </Dialog>
          <div class="right-sidebar">
            <div class="slimscrollright">
              <div class="rpanel-title">
                Service Panel <span><i class="ti-close right-side-toggle"></i></span>
              </div>
              <div class="r-panel-body">
                <ul id="themecolors" class="m-t-20">
                  <li><b>With Light sidebar</b></li>
                  <li><a href="javascript:void(0)" theme="default" class="default-theme">1</a></li>
                  <li><a href="javascript:void(0)" theme="green" class="green-theme">2</a></li>
                  <li><a href="javascript:void(0)" theme="gray" class="yellow-theme">3</a></li>
                  <li><a href="javascript:void(0)" theme="blue" class="blue-theme">4</a></li>
                  <li><a href="javascript:void(0)" theme="purple" class="purple-theme">5</a></li>
                  <li><a href="javascript:void(0)" theme="megna" class="megna-theme">6</a></li>
                  <li><b>With Dark sidebar</b></li>
                  <br />
                  <li>
                    <a href="javascript:void(0)" theme="default-dark" class="default-dark-theme"
                      >7</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)" theme="green-dark" class="green-dark-theme">8</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" theme="gray-dark" class="yellow-dark-theme">9</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)" theme="blue-dark" class="blue-dark-theme working"
                      >10</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)" theme="purple-dark" class="purple-dark-theme"
                      >11</a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)" theme="megna-dark" class="megna-dark-theme">12</a>
                  </li>
                </ul>
                <ul class="m-t-20 chatonline">
                  <li><b>Chat option</b></li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/varun.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Varun Dhavan <small class="text-success">online</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/genu.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Genelia Deshmukh <small class="text-warning">Away</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/ritesh.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Ritesh Deshmukh <small class="text-danger">Busy</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/arijit.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Arijit Sinh <small class="text-muted">Offline</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/govinda.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Govinda Star <small class="text-success">online</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/hritik.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>John Abraham<small class="text-success">online</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/john.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Hritik Roshan<small class="text-success">online</small></span></a
                    >
                  </li>
                  <li>
                    <a href="javascript:void(0)"
                      ><img
                        src="../plugins/images/users/pawandeep.jpg"
                        alt="user-img"
                        class="img-circle"
                      />
                      <span>Pwandeep rajan <small class="text-success">online</small></span></a
                    >
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- ============================================================== -->
          <!-- end right sidebar -->
          <!-- ============================================================== -->
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- ============================================================== -->
      <!-- End Page Content -->
      <!-- ============================================================== -->
    </div>
  </body>
</template>

<style scoped>
.name_bussines {
  /* display: block; */
  color: white;
  text-align: center;
  margin-left: 50%;
  align-content: center;
  min-height: 60px;
}
.translate {
  display: flex;
  justify-content: end;
  width: 95%;
  margin-right: 190px;
  margin-top: 1px;
}
.idioma {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 0px;
  border: 1px solid rgb(219, 219, 219);
  position: relative;
  border-radius: 3px;
  margin-right: 18px;
  margin-top: 9px;
}
.idioma:hover {
  background-color: rgb(228, 228, 228);
}
/* Lista de idiomas */
.idiomas {
  position: absolute;
  top: 35px;
  display: flex;
  flex-direction: column;
  visibility: hidden;
}
.idiomas li {
  width: 100%;
}
.idiomas li a {
  display: block;
  padding: 10px;
  font-size: 10px;
  color: rgb(85, 85, 85);
}
.idiomas li a:hover {
  background-color: rgb(219, 219, 219);
}
.idiomas li img {
  border-radius: 50%;
}

.img-flag {
  padding: 8px;
  width: 40px;
}
</style>
