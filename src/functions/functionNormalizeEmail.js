export default function normalizeEmail(email){
    return email.normalize("NFD").replace(/[ \u0300-\u036f]/g, "")
}