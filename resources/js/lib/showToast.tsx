import { toast } from "@/hooks/use-toast";

interface Props {
    description: string;
    type?: string;
}
export function showToast(props: Props) {
    let className;
    if (props.type === "success") {
        className = "bg-primary";
    } else if (props.type === "error") {
        className = "bg-destructive";
    } else {
        className = "bg-yellow-500";
    }
    toast({
        title: props.type,
        description: props.description,
        className: `toaster-top-right text-white ${className}`,
        duration: 3000,
    });
}
