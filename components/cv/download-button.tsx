"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import { CVDoc } from "./cv-document";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export function DownloadCVButton() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // PDFDownloadLink fails on SSR, so render only on client
    if (!isMounted) {
        return (
            <MagneticButton className="px-8 py-4 glass border-2 border-primary/30 rounded-full font-semibold text-lg hover:border-primary/50 text-white">
                <Download className="w-5 h-5 inline-block mr-2" />
                Download CV
            </MagneticButton>
        );
    }

    return (
        <PDFDownloadLink document={<CVDoc />} fileName="daniel-oriazowan-cv.pdf">
            {({ loading }) => (
                <MagneticButton className="px-8 py-4 glass border-2 border-primary/30 rounded-full font-semibold text-lg hover:border-primary/50 text-white">
                    {loading ? (
                        <Loader2 className="w-5 h-5 inline-block mr-2 animate-spin" />
                    ) : (
                        <Download className="w-5 h-5 inline-block mr-2" />
                    )}
                    {loading ? "Preparing PDF..." : "Download CV"}
                </MagneticButton>
            )}
        </PDFDownloadLink>
    );
}
