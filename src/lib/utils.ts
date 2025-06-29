type ClassValue = string | undefined | null | false | ClassValue[];

type VariantOptions = {
  [variantName: string]: {
    [option: string]: string;
  };
};

type DefaultVariants = {
  [variantName: string]: string | boolean | undefined;
};

type CvaOptions = {
  variants?: VariantOptions;
  defaultVariants?: DefaultVariants;
};

function flattenClassNames(input: ClassValue): string[] {
  if (!input) return [];
  if (typeof input === "string") return [input];
  if (Array.isArray(input)) {
    return input.flatMap(flattenClassNames);
  }
  return [];
}

function mergeTailwindClasses(classes: string[]): string {
  const seen = new Set<string>();
  const result: string[] = [];

  for (const cls of classes) {
    if (!seen.has(cls)) {
      seen.add(cls);
      result.push(cls);
    }
  }

  return result.join(" ");
}

export function cn(...inputs: ClassValue[]): string {
  return mergeTailwindClasses(flattenClassNames(inputs));
}

export function createCva(base: string, options?: CvaOptions) {
  return (args: Record<string, string | boolean | undefined> = {}) => {
    const classes: string[] = [base];

    const { variants = {}, defaultVariants = {} } = options || {};

    for (const variantName in variants) {
      const selected =
        (args[variantName] as string | undefined) ??
        defaultVariants[variantName];

      if (selected && variants[variantName][selected as string]) {
        classes.push(variants[variantName][selected as string]);
      }
    }

    if (args.className && typeof args.className === "string") {
      classes.push(args.className);
    }

    return classes.join(" ");
  };
}

// Wallet signature utility
export const requestWalletSignature = async (message: string): Promise<string> => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("No ethereum provider found");
  }

  // Use dynamic import to avoid TypeScript issues
  const { ethers } = await import("ethers");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const provider = new ethers.BrowserProvider(window.ethereum as any);
  const signer = await provider.getSigner();
  
  return await signer.signMessage(message);
};
