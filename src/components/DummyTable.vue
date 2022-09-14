<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm">
    <b-button variant="info" @click="showModal(newEmploee, true)">Добавить работника</b-button>
  </div>
    <div class="col-sm">
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      Ошибка - повторите это действие через {{ dismissCountDown }} секунд...
    </b-alert>
  </div>
  </div>
    <table class="table table-borderless" id="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>ФИО</th>
          <th>З/П</th>
          <th>Возраст</th>
          <th>Удалить</th>
        </tr>
      </thead>
      <tbody v-if="employees && employees.length">
        <tr v-for="(employee, index) in employees" :key="index" @dblclick="showModal(employee, false)">
          <td>{{ employee.id || "-" }}</td>
          <td>{{ employee.employee_name || "-" }}</td>
          <td>{{ employee.employee_salary || "-" }}</td>
          <td>{{ employee.employee_age || "-" }}</td>
          <td>
            <b-button variant="danger" @click="showMsgBox(employee)">Удалить</b-button>
          </td>
        </tr>
      </tbody>

      <tbody v-if="errors && errors.length">
        <tr v-for="(error, index) in errors" :key="index">
          <td>{{ error.message }}</td>
        </tr>
      </tbody>
    </table>

    <b-modal
      id="modal-employee"
      title="Добавить пользователя"
      button-size="sm"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <p class="my-2">
          <span>ФИО</span
          ><b-form-input
            v-model="newEmploee.employee_name"
            placeholder="Введите имя"
            type="text"
            required
          ></b-form-input>
        </p>
        <p class="my-2">
          <span>З/П</span
          ><b-form-input
            v-model="newEmploee.employee_salary"
            placeholder="Введите З/П"
            type="number"
          ></b-form-input>
        </p>
        <p class="my-2">
          <span>Возраст</span
          ><b-form-input
            v-model="newEmploee.employee_age"
            placeholder="Введите возраст"
            type="number"
          ></b-form-input>
        </p>
      </form>
    </b-modal>
  </div>
</template>

<script>
import {
  getEmployeesList,
  deleteEmployee,
  createEmployee,
  updateEmployee
} from "../services/api";

const newEmploee = {
        employee_name: "",
        employee_salary: 0,
        employee_age: 0,
      }
export default {
  name: "DummyTable",
  data() {
    return {
      employees: [],
      errors: [],
      newEmploee: JSON.parse(JSON.stringify(newEmploee)),
      dismissSecs: 3,
      dismissCountDown: 0,
      isNew: false
    };
  },
  created() {
    getEmployeesList()
      .then((resp) => {
        if (!Array.isArray(resp)) {
          throw new Error('Ошибка получения списка')
        }
        this.employees = resp;
      })
      .catch((e) => {
        this.errors.push(e);
        console.log(this.errors)
      });
  },
  methods: {
    countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      },
      showModal(item, isNew) {
        this.newEmploee = item
        this.isNew = isNew
        this.$bvModal.show("modal-employee");
      },
    showMsgBox(item) {
      let confirmed;
      this.boxTwo = item.employee_name;
      this.$bvModal
        .msgBoxConfirm(
          `Вы точно хотите удалить работника ${item.employee_name}`,
          {
            title: "Да",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            okTitle: "YES",
            cancelTitle: "NO",
            footerClass: "p-2",
            hideHeaderClose: false,
            centered: true,
          }
        )
        .then((value) => {
          confirmed = value;
          if (value) {
            return deleteEmployee(item.id);
          }
        })
        .then((res) => {
          if (res && res.data.data) {
            this.employees = this.employees.filter(
              (e) => e.id !== +res.data.data
            );
          }
          console.log(res, confirmed);
          this.boxTwo = confirmed;
        })
        .catch(() => {
          this.showAlert()
        });
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity();
      return valid;
    },
    handleOk(bvModalEvent) {
      bvModalEvent.preventDefault();
      this.handleSubmit();
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return;
      }
      
      const f = this.isNew ?  createEmployee(this.newEmploee) :  updateEmployee(this.newEmploee)
        f.then((res) => {
          console.log(res)
          if(!res.data) {
            throw new Error('ошибка запроса')
          }

          if (this.isNew) {
            this.employees.push(res.data.data)  
            this.isNew = false
          }

          this.newEmploee = JSON.parse(JSON.stringify(newEmploee))
        })
        .catch((e) => {
          this.showAlert(e)
        })
        this.$nextTick(() => {
          this.$bvModal.hide("modal-employee");
        })
    },
  },
};
</script>
