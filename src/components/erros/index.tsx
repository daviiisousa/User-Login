export function Errors({ error }: { error: string | undefined }) {
    return <span className="text-red-500">{error || "error"} </span>
}