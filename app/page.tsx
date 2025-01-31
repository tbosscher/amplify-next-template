"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import { Amplify } from "aws-amplify";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";
import { Authenticator, View, Image,Text, useTheme } from '@aws-amplify/ui-react';
import { StorageBrowser } from '../components/StorageBrowser';

Amplify.configure(outputs);

const client = generateClient<Schema>();

const components = {
  Header() {
    const { tokens } = useTheme();

    return (
      <View 
        textAlign="center" 
        padding={tokens.space.large} 
        style={{ marginTop: "-50px" }} // Moves logo & text higher
      >
        {/* Logo */}
        <Image
          alt="WorkShift Logo"
          src="https://images-axioshr.s3.us-east-1.amazonaws.com/WorkShift_PrimaryLogo_1000px.png"
          width="280px"
          style={{ maxWidth: "100%", height: "auto" }}
        />

        {/* Welcome Message Below Logo */}
        <Text 
          style={{ 
            fontSize: "1.25rem", 
            fontWeight: "bold", 
            color: "#005a68", 
            marginTop: "5px" 
          }}
        >
          Welcome to WorkShift Docs!
        </Text>
      </View>
    );
  }
};


export default function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  function listTodos() {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }

  useEffect(() => {
    listTodos();
  }, []);

  function createTodo() {
    client.models.Todo.create({
      content: window.prompt("Todo content"),
    });
  }

  return (
    <Authenticator hideSignUp={true} components={components}>
      {({ signOut, user }) => (
        <main style={{ textAlign: "center", padding: "2rem", color: "#005a68" }}>
          {/* Centered Logo */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Image
              alt="WorkShift Logo"
              src="https://images-axioshr.s3.us-east-1.amazonaws.com/WorkShift_PrimaryLogo_1000px.png"
              width="280px"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>

          {/* Welcome Message */}
          <p style={{ fontSize: "1rem", marginBottom: "5px" }}>
            Welcome to WorkShift Docs!
          </p>

          {/* Sign Out Button - MASSIVE Space Below */}
          <button 
            onClick={signOut} 
            style={{
              backgroundColor: "#005a68",
              color: "white",
              border: "none",
              padding: "10px 20px",
              fontSize: "1rem",
              borderRadius: "5px",
              cursor: "pointer",
              marginBottom: "120px" // Increased space significantly
            }}>
            Sign out
          </button>

          {/* StorageBrowser Component */}
          <StorageBrowser />
        </main>
      )}
    </Authenticator>
);





}
