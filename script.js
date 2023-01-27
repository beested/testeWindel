//LocalStorage
const getLocalStorage = () =>
  JSON.parse(localStorage.getItem('db_produto')) ?? []
const setLocalStorage = db_produto =>
  localStorage.setItem('db_produto', JSON.stringify(db_produto))

//CRUD = create read update delete
const deleteProduto = index => {
  const db_produto = readProduto()
  db_produto.splice(index, 1)
  setLocalStorage(db_produto)
}

//CRUD == update produtos (alterar)
const updateProduto = (index, produto) => {
  const db_produto = readProduto()
  db_produto[index] = produto
  setLocalStorage(db_produto)
}

//CRUD == read (LER/EXIBIR)
const readProduto = () => getLocalStorage()

//CRUD == CREATE
const createProduto = produto => {
  const db_produto = getLocalStorage()
  db_produto.push(produto)
  setLocalStorage(db_produto)
}

//Validação dos campos
const isValidFields = () => {
  return document.getElementById('form1').reportValidity()
}

//LimparCampos
const clearFields = () => {
  const fields = document.querySelectorAll('.input')
  fields.forEach(field => (field.value = ''))
}

//Interação com o Layout
const saveProduto = () => {
  if (isValidFields()) {
    const inputImage = document.getElementById('image')
    const image = inputImage.files[0]
    const reader = new FileReader()
    reader.onloadend = () => {
      const produto = {
        descricao: document.getElementById('descricao').value,
        vlrvenda: document.getElementById('vlrvenda').value,
        referencia: document.getElementById('referencia').value,
        unidade: document.getElementById('unidade').value,
        marca: document.getElementById('marca').value,
        estoque: document.getElementById('estoque').value,
        image: reader.result
      }
      const index = document.getElementById('descricao').dataset.index
      if (index == 'new') {
        createProduto(produto)
        clearFields()
        updateTable()
      } else {
        updateProduto(index, produto)
        clearFields()
        updateTable()
      }
    }
    reader.readAsDataURL(image)
    updateTable()
  }
}
//criação das TDs
const createRow = (produto, index) => {
  const newRow = document.createElement('tr')

  if (produto.estoque == 0) {
    newRow.innerHTML = `
  <td> <img src="${produto.image}" class='image__prod'></td>
  <td>${produto.descricao}</td>
  <td>${produto.referencia}</td>
  <td>R$ ${produto.vlrvenda}</td>
  <td>${produto.marca}</td>
  <td id='esgotado'>Esgotado</td>
  <td>${produto.unidade}</td>
  <td>
  <button type="button" class="button__delete" id='delete-${index}'>Excluir</button>
  <button type="button" class="button__edit" id='edit-${index}'>Editar</button>
  </td>
  `
  } else {
    newRow.innerHTML = `
  <td> <img src="${produto.image}" class='image__prod'></td>
  <td>${produto.descricao}</td>
  <td>${produto.referencia}</td>
  <td>R$ ${produto.vlrvenda}</td>
  <td>${produto.marca}</td>
  <td>${produto.estoque}</td>
  <td>${produto.unidade}</td>
  <td>
  <button type="button" class="button__delete" id='delete-${index}'>Excluir</button>
  <button type="button" class="button__edit" id='edit-${index}'>Editar</button>
  </td>
  `
  }
  document.querySelector('#tableProduto>tbody').appendChild(newRow)
}
//

//não deixar numeros negativos quando o input for number
document
  .querySelector("input[type='number']")
  .addEventListener('input', function () {
    if (this.value < 0) {
      this.value = ''
    }
  })

//limpar tabela
const clearTable = () => {
  const rows = document.querySelectorAll('#tableProduto>tbody tr')
  rows.forEach(row => row.parentNode.removeChild(row))
}

const updateTable = () => {
  const db_produto = readProduto()
  clearTable()
  db_produto.forEach(createRow)
}

const fillFields = produto => {
  document.getElementById('descricao').value = produto.descricao
  document.getElementById('vlrvenda').value = produto.vlrvenda
  document.getElementById('referencia').value = produto.referencia
  document.getElementById('unidade').value = produto.unidade
  document.getElementById('marca').value = produto.marca
  document.getElementById('estoque').value = produto.estoque
  document.getElementById('image').value = produto.image
  document.getElementById('descricao').dataset.index = produto.index
}

const editProduto = index => {
  const produto = readProduto()[index]
  produto.index = index
  fillFields(produto)
  console.log(produto)
}

const editDelete = event => {
  if (event.target.type == 'button') {
    const [action, index] = event.target.id.split('-')
    if (action == 'edit') {
      editProduto(index)
    } else {
      const produto = readProduto()[index]
      const response = confirm(
        `deseja realmente excluir esse o produto ${produto.descricao}?`
      )
      if (response) {
      }
      deleteProduto(index)
      updateTable()
    }
  }
}

const limpProd = event => {
  clearFields()
  updateTable()
}

const input = document.getElementById('image')
const display = document.getElementById('file__upload')

input.addEventListener('change', function () {
  const file = input.files[0]
  const reader = new FileReader()

  reader.addEventListener('load', function () {
    display.src = reader.result
  })

  reader.readAsDataURL(file)
})

updateTable()

//Eventos
document.getElementById('save').addEventListener('click', saveProduto)
document.getElementById('limpProd').addEventListener('click', limpProd)

document
  .querySelector('#tableProduto>tbody')
  .addEventListener('click', editDelete)
