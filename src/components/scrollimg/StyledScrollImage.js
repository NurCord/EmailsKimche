import styled, { keyframes } from "styled-components";

export const ScrollImagContainers = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    -webkit-box-pack: center;
    justify-content: center;
    min-width: 400px;
    position: relative;
    width: 35%;
`

export const ScrollImagContainer = styled.div`
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    height: 100%;
    overflow: hidden;
    position: absolute;
    width: 100%;
`

const gg = keyframes`
    0%{ 
        transform: translateY(-22%);
    }
    100% { 
        transform: translateY(0px);
     }
`
export const ScrollImagContainerImgs = styled.div`
    animation: 100s linear 0s infinite normal none running ${gg};
    height: 100%;
`


