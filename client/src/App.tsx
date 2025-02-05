import { gql, useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import "./App.css";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_PRODUCT = gql`
  query GetProduct {
    getProduct {
      productId
      productName
      productPrice
    }
  }
`;

const GET_USERS_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      age
      name
      isMarried
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String!
    $age: Int!
    $isMarried: Boolean!
  ) {
    updateUser(id: $id, name: $name, age: $age, isMarried: $isMarried) {
      id
      age
      name
      isMarried
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

type user = {
  id: string;
  age: number;
  name: string;
  isMarried: boolean;
};

type product = {
  productId: string;
  productName: string;
  productPrice: number;
};

type userData = {
  age: number;
  name: string;
  isMarried: boolean;
};

function App() {
  const [users, setUsers] = useState<userData>({
    name: "",
    age: 0,
    isMarried: false,
  });
  const {
    data: getUsers,
    error: getUsersError,
    loading: getUsersLoading,
  } = useQuery(GET_USERS);
  const {
    data: getIdData,
    error: getIdError,
    loading: getIdLoading,
  } = useQuery(GET_USERS_BY_ID, {
    variables: { id: "2" },
  });

  const { data: getProduct } = useQuery(GET_PRODUCT);

  const [createUser] = useMutation(CREATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  if (getUsersLoading || getIdLoading) return <p>Fetching Data...</p>;

  if (getUsersError || getIdError)
    return <p> Error: {getUsersError?.message || getIdError?.message}</p>;

  async function handleCreateUser() {
    console.log("Clicked");

    createUser({
      variables: {
        name: users.name,
        age: users.age,
        isMarried: users.isMarried,
      },
    });
  }

  async function handleUpdate(id: number) {
    updateUser({
      variables: {
        id: id,
        name: users.name,
        age: users.age,
        isMarried: users.isMarried,
      },
    });
  }

  async function handleDelete(id: number) {
    deleteUser({
      variables: {
        id: id,
      },
    });
  }

  return (
    <>
      <div>
        <input
          placeholder="Name"
          value={users.name}
          onChange={(e) =>
            setUsers((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          placeholder="Age"
          type="number"
          value={users.age}
          onChange={(e) =>
            setUsers((prev) => ({ ...prev, age: Number(e.target.value) }))
          }
        />
        <button color="white" onClick={handleCreateUser}>
          Create Users
        </button>
      </div>
      <h1>Users</h1>
      <p>{getIdData.getUserById.name}</p>
      <p>{getIdData.getUserById.age}</p>
      {getProduct.getProduct.map((prod: product) => (
        <div key={prod.productId}>
          <h2>{prod.productName}</h2>
          <h3>{prod.productPrice}</h3>
        </div>
      ))}
      <div>
        {getUsers.getUsers.map((d: user) => (
          <div key={d.id}>
            <h2 className="text-4xl text-red-500">
              Hi, My name is Whatt?? My name is, whoo? My name is, chka chka,
              Slim {d.name}
            </h2>
            <h2 className="text-4xl text-red-500">
              Hi, My age is Whatt?? My age is, whoo? My age is, chka chka, Slim{" "}
              {d.age}
            </h2>
            <h3 className="text-4xl text-red-500">
              {d.isMarried ? "true" : "false"}
            </h3>
            <button color="white" onClick={() => handleDelete(Number(d.id))}>
              Delete Users
            </button>
            <button color="white" onClick={() => handleUpdate(Number(d.id))}>
              Update User
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
