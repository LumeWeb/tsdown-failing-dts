import { ChevronDownIcon } from "@/components/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { type ReactNode, useState } from "react";
import { Link } from "react-router";

import { cn } from "../../lib/utils";

interface NavigationItemContentProps {
  children: ReactNode;
}

interface NavigationItemProps {
  active?: boolean;
  children: ReactNode;
  href?: string;
}

interface NavigationProps {
  children: ReactNode;
}

interface NavigationSubItemProps {
  active?: boolean;
  children: ReactNode;
  href?: string;
}

export function Navigation({ children }: NavigationProps) {
  return <nav className="space-y-1">{children}</nav>;
}

export function NavigationItem({
  active,
  children,
  href,
}: NavigationItemProps) {
  const [_isOpen, setIsOpen] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const content = childrenArray.find(
    (child) =>
      React.isValidElement(child) && child.type === NavigationItemContent,
  );
  const subItems = childrenArray.filter(
    (child) => React.isValidElement(child) && child.type === NavigationSubItem,
  );
  const hasSubItems = subItems.length > 0;
  const isOpen = _isOpen || active;
  const itemContent = (
    <button
      className={cn(
        "group px-5 text-sm font-medium rounded-md transition-colors text-foreground",
        active
          ? "opacity-100 border-[1px] border-secondary"
          : "opacity-50 hover:opacity-75",
        isOpen && hasSubItems && "bg-input !h-auto pb-4",
      )}
      data-active={active}
      onClick={() => hasSubItems && setIsOpen(!isOpen)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          hasSubItems && setIsOpen(!isOpen);
        }
      }}
      tabIndex={0}
      type="button">
      <div className="flex items-center justify-between h-[64px]">
        {href ? (
          <Link className={"cursor-pointer"} to={href}>
            {content}
          </Link>
        ) : (
          content
        )}
        {hasSubItems && (
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}>
            <ChevronDownIcon
              className={cn(
                "w-4 h-4 transition-transform ml-2",
                isOpen && "transform rotate-180",
              )}
            />
          </motion.div>
        )}
      </div>
      <AnimatePresence>
        {hasSubItems && isOpen && (
          <motion.div
            animate={{ height: "auto", opacity: 1 }}
            className="ml-4 mt-1 space-y-1 overflow-hidden"
            exit={{ height: 0, opacity: 0 }}
            initial={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.1 }}>
            {subItems}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );

  return <div>{itemContent}</div>;
}

export function NavigationItemContent({
  children,
}: NavigationItemContentProps) {
  return (
    <div className="flex items-center px-3 py-2 text-sm font-medium text-foreground/60 group-data-[active='true']:text-foreground group:data-[active=true]:border-secondary rounded-md transition-colors hover:opacity-50">
      {children}
    </div>
  );
}

export function NavigationSubItem({
  active,
  children,
  href,
}: NavigationSubItemProps) {
  const content = (
    <div
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:opacity-50",
        active ? "text-foreground" : "text-foreground/60",
      )}>
      {children}
    </div>
  );

  return href ? (
    <Link className="flex-grow" to={href}>
      {content}
    </Link>
  ) : (
    content
  );
}
