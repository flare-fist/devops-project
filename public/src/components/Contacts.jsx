import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    const func = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setCurrentUserName(data.username);
      setCurrentUserImage(data.avatarImage);
    };
    func();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Melvin's chat corner</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #0b0b2e; /* Darker background for a unique touch */

  .brand {
    display: flex;
    align-items: center;
    gap: 1.2rem; /* Slightly increased gap */
    justify-content: center;

    img {
      height: 2.2rem; /* Slightly larger logo */
      border-radius: 5%; /* Added border radius for a softer look */
    }

    h3 {
      color: #e0e0e0; /* Changed text color for contrast */
      text-transform: uppercase;
      font-weight: bold; /* Added bold for emphasis */
      letter-spacing: 1px; /* Added letter spacing for style */
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 1rem; /* Increased gap for better spacing */
    
    &::-webkit-scrollbar {
      width: 0.3rem; /* Thicker scrollbar */
      &-thumb {
        background-color: #ffffff40; /* Slightly more opaque scrollbar */
        border-radius: 1rem;
      }
    }

    .contact {
      background-color: #ffffff20; /* Lighter background for contacts */
      min-height: 6rem; /* Increased minimum height for a bolder look */
      cursor: pointer;
      width: 90%;
      border-radius: 0.4rem; /* Slightly rounder corners */
      padding: 0.5rem; /* More padding for better touch targets */
      display: flex;
      gap: 1.2rem; /* Slightly larger gap */
      align-items: center;
      transition: background-color 0.3s ease; /* Smoother transition effect */

      .avatar {
        img {
          height: 3.2rem; /* Slightly larger avatar size */
          border-radius: 50%; /* Make avatar images circular */
        }
      }

      .username {
        h3 {
          color: #ffffff; /* Changed to pure white for better contrast */
        }
      }

      &:hover {
        background-color: #7f8c8d; /* Added hover effect color */
      }
    }

    .selected {
      background-color: #8e44ad; /* Changed selected color for uniqueness */
    }
  }

  .current-user {
    background-color: #1d1d40; /* Changed to a darker shade */
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;

    .avatar {
      img {
        height: 4.5rem; /* Slightly larger user avatar */
        border-radius: 50%; /* Circular avatar */
      }
    }

    .username {
      h2 {
        color: #f0f0f0; /* Changed to a lighter shade for better readability */
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.6rem;

      .username {
        h2 {
          font-size: 1.1rem; /* Slightly larger font size for medium screens */
        }
      }
    }
  }
`;

