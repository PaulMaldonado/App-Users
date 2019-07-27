// SDK de Firebase

firebase.initializeApp({
  apiKey: '########################',
  authDomain: '####################',
  projectId: '#####################'
});

let db = firebase.firestore();

// Función para registrar usuarios en firebase.

function CreateUsers() {
  // Obteniendo id de cada elemento dentro del DOM.
  const name = document.getElementById('name').value;
  const description = document.getElementById('description').value;
  const age = document.getElementById('age').value;
  const date = document.getElementById('date').value;

  if(name === '' || description === '' || age === '' || date === '') {
    alert('Los campos no deben estar en blanco');

    return;
  }

  db.collection('users').add({
    name: name,
    description: description,
    age: age,
    date: date
  })

  .then(function(docRef) {
    console.log('Document written with ID: ', docRef.name);
  })

  .catch(function(error) {
    console.log('Error adding document: ', error);
  });

}


const usersList = document.getElementById('users-list');

  db.collection('users').get().then((responseUsers) => {
    usersList.innerHTML = '';

    responseUsers.forEach((user) => {

      usersList.innerHTML += `
        <div class="card border-primary mb-3">
          <div class="card-header">
            <h4>Usuarios</h4>
          </div>
          <div class="card-body">
            <h5>Nombre: ${user.data().name}</h5>
            <h6>Descripción: ${user.data().description}</h6>
            <p>Edad: ${user.data().age}</p>
            <p>Fecha de creación: ${user.data().date}</p>
            <br>

            <button type="button" class="btn btn-info mr-3" onclick="EditUsers('${user.data().name}', '${user.data().description}', '${user.data().age}', '${user.data().date}')">Editar Registro</button>
            <button type="button" class="btn btn-danger" id="button" onclick="DeleteUsers('${user.data().name}')">Eliminar Registro</button>
          </div>
        </div>
      `;
    });
  });

  function EditUsers(name, description, age, date) {
    document.getElementById('name').value = name;
    document.getElementById('description').value = description;
    document.getElementById('age').value = age;
    document.getElementById('date').value = date;

    let button = document.getElementById('button');

    button.innerHTML = 'Editar Usuario';

    button.onclick = function() {
      let updateUsers = db.collection('users').doc(name);

      return updateUsers.update({
        name: name,
        description: description,
        age: age,
        date: date
      })
      
      .then(function() {
        button.innerHTML = 'Crear Usuario';
        console.log("Document successfully updated!");
      })
      
      .catch(function(error) {
        console.error("Error updating document: ", error);
      });
    }

  }


  function DeleteUsers(name) {
  
    db.collection('users').doc(name).delete().then(function() {
      console.log("Document successfully deleted!");
    }).catch(function(error) {
      console.error("Error removing document: ", error);
    });
  
  }