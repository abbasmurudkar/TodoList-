import React from "react";
import styled from "styled-components";
import todoImage from "../assets/todo1.png";
import Model from "./Model";
import Card from "./Card";

const Todo = () => {
  const tags = [
    {
      label: "Important",
      color: "#fab5c0",
    },
    {
      label: "Study",
      color: "#cefab5",
    },
    {
      label: "Family",
      color: "#fafab5",
    },
    {
      label: "Entertainment",
      color: "#e1b5fa",
    },
  ];

  return (
    <Wrapper>
      <Sidebar>
        <Logo>
          <img
            src="https://dimensionlesswebsite.azureedge.net/dimensionlesswebsiteimage/dimesnionlesslogonew.svg"
            alt="Dimensionless Logo"
          />
          <h2>Dimensionless</h2>
        </Logo>
        <TagsBlock>
          <h4>Tags</h4>
          <div className="divider" />
          <TagsList>
            {tags.map((tag, index) => (
              <Tag key={index}>
                <TagColor style={{ background: tag.color }} />
                <p>{tag.label}</p>
              </Tag>
            ))}
          </TagsList>
        </TagsBlock>
        <Footer>
          <img src={todoImage} alt="To-do" />
        </Footer>
      </Sidebar>
      <MainContent>
        <div className="header">
            <Model tags={tags}/>
        </div>
        <div className="content">
            <Card tags={tags}/>
        </div>
      </MainContent>
    </Wrapper>
  );
};

export default Todo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const Sidebar = styled.div`
  width: 100%;
  height: auto;
  position: relative;
  background: linear-gradient(
    to top,
    rgba(244, 244, 244, 0.6),
    rgba(113, 118, 113, 0.25)
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  border-right: none;
  border-radius: 0;

  @media (min-width: 769px) {
    width: 25%;
    height: 100vh;
    position: fixed;
    border-right: 2px solid rgba(244, 244, 244, 1);
    border-radius: 2px 20px 20px 2px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  img {
    width: 30px;
    height: 40px;
    animation: bounce 1s infinite;
  }
  h2 {
    margin-top: 10px;
    margin-left: 10px;
    animation: fadeIn 1s ease-out;
    font-size: 25px;
  }

  @keyframes bounce {
    0%,20%,50%,80%,100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-10px);
    }
    60% {
      transform: translateY(-5px);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const TagsBlock = styled.div`
  width: 100%;
  .divider {
    height: 1px;
    background: black;
    margin: 10px 0;
    animation: pulse 2s infinite;
  }
  h4 {
    font-size: 18px;
  }
  @keyframes pulse {
    0% {
      background-color: black;
    }
    50% {
      background-color: #555;
    }
    100% {
      background-color: black;
    }
  }
`;

const TagsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px 0;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background-color 0.3s;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    .color {
      animation: rotate 1s linear infinite;
    }
    p {
      font-weight: bolder;
      color: #333;
    }
    background-color: rgba(0, 0, 0, 0.05);
  }

  p {
    margin-left: 15px;
    font-size: 16px;
    transition: color 0.3s ease-in-out;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const TagColor = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  transition: transform 0.3s ease-in-out;
`;

const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 200px;
  }
`;

const MainContent = styled.div`
  margin-left: 0;
  padding: 20px;
  width: 100%;
  height: auto;
  overflow-y: auto;
  background-color: #f4f4f4;

  @media (min-width: 769px) {
    margin-left: 25%;
    width: 75%;
  }
.header{
  display: flex;
  flex-direction: row-reverse;
}
.content{
  margin-top: 20px;
  padding: 10px;
}

`;
