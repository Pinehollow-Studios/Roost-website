"use client";

import { motion } from "framer-motion";
import type { ProductSection } from "@/lib/product";

const ease = [0.16, 1, 0.3, 1] as const;

function MoneyVisual() {
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">April budget</p>
          <p className="mt-2 text-4xl font-medium tracking-tight text-foreground">£1,284 left</p>
        </div>
        <div className="grid h-24 w-24 place-items-center rounded-full border-[10px] border-primary/70 bg-background text-sm font-medium">
          63%
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {[
          ["Income", "£4,800"],
          ["Fixed", "£1,930"],
          ["Goals", "£420"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg bg-background p-4">
            <p className="text-xs text-muted-foreground">{label}</p>
            <p className="mt-1 text-lg font-medium">{value}</p>
          </div>
        ))}
      </div>
      <div className="space-y-3">
        {[
          ["Food & drink", "72%"],
          ["Transport", "39%"],
          ["Personal", "54%"],
        ].map(([label, value], index) => (
          <div key={label}>
            <div className="mb-1 flex justify-between text-sm">
              <span>{label}</span>
              <span className="text-muted-foreground">{value}</span>
            </div>
            <div className="h-2 rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                whileInView={{ width: value }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease, delay: index * 0.08 }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ListVisual({ type }: { type: ProductSection["visual"] }) {
  const rows: Record<string, string[]> = {
    shopping: ["Oat milk", "Pasta", "Apples", "Washing tablets"],
    chores: ["Clean bathroom", "Bins out", "Water plants", "Vacuum hall"],
    calendar: ["Rent due", "Bathroom clean", "Food shop", "Energy bill"],
    pinboard: ["Boiler reading", "Dinner booking", "Parcel code", "Council tax"],
    home: ["Budget on track", "Shop tomorrow", "2 chores due", "Sam added a note"],
    hazel: ["Sorted groceries", "Matched budget", "Tidied chore", "Spotted trend"],
    money: [],
  };
  const items = rows[type] ?? rows.home;

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <motion.div
          key={item}
          className="flex items-center justify-between rounded-lg bg-background px-4 py-3"
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease, delay: index * 0.06 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="font-medium">{item}</span>
          </div>
          <span className="text-sm text-muted-foreground">{index === 0 ? "Now" : `${index + 1}d`}</span>
        </motion.div>
      ))}
      <div className="mt-5 rounded-lg border border-border bg-background/60 p-4">
        <p className="text-sm text-muted-foreground">
          {type === "hazel"
            ? "Hazel works quietly behind the inputs you already use."
            : "Every change stays shared across the household."}
        </p>
      </div>
    </div>
  );
}

export default function ProductVisual({ section }: { section: ProductSection }) {
  return (
    <motion.div
      className="relative overflow-hidden rounded-lg border border-border bg-card p-5 shadow-[0_18px_60px_rgba(32,36,31,0.10)] dark:shadow-[0_18px_60px_rgba(0,0,0,0.5)]"
      initial={{ opacity: 0, y: 36, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease }}
    >
      <div
        className="absolute inset-x-0 top-0 h-1"
        style={{ backgroundColor: section.color }}
        aria-hidden="true"
      />
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-foreground">Roost</p>
          <p className="text-xs text-muted-foreground">{section.name}</p>
        </div>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/35" />
        </div>
      </div>
      {section.visual === "money" ? <MoneyVisual /> : <ListVisual type={section.visual} />}
    </motion.div>
  );
}
