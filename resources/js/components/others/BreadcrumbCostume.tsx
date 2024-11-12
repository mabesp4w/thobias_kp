import { Slash } from "lucide-react";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Fragment } from "react/jsx-runtime";
import { Link } from "@inertiajs/react";

export default function BreadcrumbCustom({ items }: any) {
    return (
        <Breadcrumb>
            <BreadcrumbList className="px-0 mx-0">
                {items.map((item: any, index: number) => (
                    <Fragment key={index}>
                        <BreadcrumbItem>
                            {item.href ? (
                                <Link
                                    className="text-gray-800"
                                    href={item.href}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <BreadcrumbPage className="text-gray-600">
                                    {item.label}
                                </BreadcrumbPage>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator>
                                <Slash />
                            </BreadcrumbSeparator>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
