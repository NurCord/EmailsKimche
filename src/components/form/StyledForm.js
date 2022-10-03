import styled from "styled-components";

const theme = {
    'red' : '#d65050',
    'blueLihth': '#63c3d3',
    'blueDarck': '#2580ac',
    'yelow': '#f5ae13'
}

export const FormContent = styled.div`
    display: grid;
    align-content: center;
    justify-content: center;
    height: 75%;
`

export const FormBackground = styled.div`
    width: 35rem;
    height: 20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
`

export const FormFC = styled.form`
    height: 90%;
    width: 20rem;
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    justify-items: start;
    align-items: center;
`

export const FormInputs = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
export const FormInput = styled.input`
    width: 100%;
    height: 3rem;
    padding-left: 1rem;
    border: solid;
    border-width: 0.1px 0.1px 0.1px 8px;
    border-color: #2f80ac;
    border-radius: 4px;
    ::after{
        border-width: 0.1px 0.1px 0.1px 8px;
        border-color: #2f80ac;
    }
`

export const FormButton = styled.input`
    height: 3rem;
    width: 10rem;
    cursor: pointer;
    background-color: #2f80ac;
    margin: auto;
    border-radius: 0.3rem;
    border: 0.1rem solid transparent;
`
export const FormButtonFile = styled.button`
    position: relative;
    height: 3rem;
    border: solid;
    border-width: 0.1px 0.1px 0.1px 8px;
    border-color: ${props => props.file ? '#0e3347' : '#2f80ac'};
    border-radius: 4px;
    width: 100%;
    margin: 0rem 0.1rem;
`
export const FormFile = styled.input`
    position: absolute;
    cursor: pointer;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
`