import styled from "styled-components"

const Style = styled.div`
  margin: 5px;

  .image-infos {
    display: flex;
    justify-content: center;

    margin: 10px 0;

    font-size: 18px;
  }

  .image-info-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > * {
      margin-bottom: 5px;
    }

    & > input {
      width: 600px;
    }
  }

  .image-container {
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;

    & img {
      max-height: 600px;
      max-width: 48%;
    }
  }
`
export default Style
