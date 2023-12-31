import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useState } from "react";
import { prisma } from "@/server/prisma";
import { Post } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: Post[];
};

export default function Home({ posts }: Props) {
  const [content, setContent] = useState("");

  const createPost = async () => {
    try {
      const response = await fetch("/api/createPost", {
        method: "POST",
        body: JSON.stringify({ content }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (!response.ok) return alert(data.message || "Something went wrong!");
      document.location.reload();
    } catch (error) {
      console.error(error);
      alert("An error occurred, check the console.");
    }
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className={`${styles.main} ${inter.className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            width: 500,
            display: "flex",
            flexDirection: "column",
            padding: 20,
          }}
        >
          <textarea
            placeholder="Write a post..."
            style={{ padding: 15, fontSize: 18 }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <button
            style={{
              padding: 15,
              fontSize: 18,
              marginTop: 10,
              backgroundColor: "blue",
              border: 0,
              cursor: "pointer",
              outline: "none",
            }}
            onClick={createPost}
          >
            Post
          </button>
        </div>

        <div style={{ width: 500, display: "flex", flexDirection: "column" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: 20,
                fontSize: 18,
                marginTop: 10,
                cursor: "pointer",
                outline: "none",
              }}
            >
              {post.content}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
