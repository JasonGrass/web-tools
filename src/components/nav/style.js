import styled from "styled-components"

const Style = styled.div`
  margin-bottom: 10px;
  height: 48px;

  background-color: #f3f6fb;
  border-bottom: solid 1px #e6e6e6;
  box-shadow: 0px 10px 5px -10px #e6e6e6;

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .nav-link {
    display: block;
    margin: auto 12px;

    color: #333;
    font-size: 18px;
    line-height: 48px;
    text-decoration: none;
    text-shadow: 0 2px 2px rgba(255, 255, 255, 0.5);

    &:hover {
      text-shadow: 0 2px 2px #8888;
    }
  }

  .nav-active {
    font-weight: 700;
  }
`

export default Style
