import styled from "styled-components"

const Style = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .read-clipboard-button {
    width: 200px;
    height: 32px;
  }

  .read-clipboard-message {
    margin: 10px 0;
  }

  .clipboard-item {
    display: flex;
    flex-direction: column;
    align-items: stretch;

    width: 800px;

    .type-labels {
      align-self: flex-start;
      margin-bottom: 10px;
    }

    .type-label {
      margin: 5px 10px 5px 0px;
      padding: 2px 5px;
      font-size: 12px;
      font-weight: 400;
      color: rgb(27, 27, 27);
      background-color: rgb(242, 241, 241);
      border-radius: 4px;
    }
  }

  .item-container {
    margin: 5px 0px;

    border: 1px solid rgb(242, 241, 241);
    border-radius: 5px;

    .item-header {
      display: flex;

      font-size: 14px;
      color: rgb(27, 27, 27);
      background-color: aliceblue;
      padding: 3px 5px;

      .item-title {
        flex: 1 1 auto;
      }
    }

    .item-content {
      padding: 5px;
      display: flex;
      flex-direction: column;
    }
  }

  .item-content-image {
    align-self: center;
  }
`

export default Style
