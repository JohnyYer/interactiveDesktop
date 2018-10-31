<template>
  <div>
    <div v-if="isReady === 1">
      <h2>Transaction Info</h2>
      <div class="ui centered grid">
        <div class="five wide column center aligned">
          <button class="ui green button" @click="subscribe">Запуск</button>
        </div>
        <div class="five wide column center aligned">
          <button class="ui red button" @click="unsubscribe">Остановка</button>
        </div>
        <div class="five wide column center aligned">
          <button class="ui orange button" @click="clear">Сброс</button>
        </div>
      </div>
      <h3 v-if="transactions.length > 0" class="center align">SUM - {{total}}BTC</h3>
      <table class="ui celled table" v-if="transactions.length > 0">
        <thead>
        <tr><th>From</th>
          <th>To</th>
          <th>Sum</th>
        </tr></thead>
        <tbody>
        <tr v-for="transaction in transactions" v-bind:key="transaction.x.hash">
          <td data-label="From">{{transaction.x.inputs[0].prev_out.addr}}</td>
          <td data-label="To">{{transaction.x.out[0].addr}}</td>
          <td data-label="Sum">{{transaction.x.size}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <div v-if="isReady === 0">
      <h2>Websocket server not responding. Wait a few seconds or reload the page</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TransactionStatus',
  data () {
    return {
      ws: new WebSocket('wss://ws.blockchain.info/inv'),
      transactions: [],
      total: 0,
      isReady: 0
    }
  },
  created () {
    this.ws.onopen = e => {
      this.isReady = this.ws.readyState
      this.ws.onmessage = e => {
        this.transactions.push(JSON.parse(e.data))
        this.total += JSON.parse(e.data).x.size
      }
    }
    this.ws.onerror = err => console.log(err)
  },
  methods: {
    subscribe () {
      this.ws.send(JSON.stringify({'op': 'unconfirmed_sub'}))
    },
    unsubscribe () {
      this.ws.send(JSON.stringify({'op': 'unconfirmed_unsub'}))
    },
    clear () {
      this.transactions = []
      this.total = 0
    }
  }
}
</script>

<style scoped>

</style>
