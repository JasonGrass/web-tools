import styled from "styled-components"

const Style = styled.div`
  margin: 5px;

  .image-watermark-box {
    display: flex;
    flex-direction: column;
    align-items: center;

    margin: 8px 0;

    & > input {
      width: 800px;
      outline-style: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 700;

      &:focus {
        border-color: #66afe9;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 4px rgba(102, 175, 233, 0.6);
      }
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

  .image-info {
    position: fixed;
    top: 80px;
    right: 20px;
  }
`
export default Style
