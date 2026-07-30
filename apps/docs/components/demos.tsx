'use client';

import { Button } from "@dndproperty/betterliving-ui/components/button";
import { Badge } from "@dndproperty/betterliving-ui/components/badge";
import { Input } from "@dndproperty/betterliving-ui/components/input";
import { Label } from "@dndproperty/betterliving-ui/components/label";
import { Skeleton } from "@dndproperty/betterliving-ui/components/skeleton";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@dndproperty/betterliving-ui/components/card";

export function DemoButton() {
  return (
    <div className="not-prose flex flex-wrap gap-2">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}

export function DemoBadge() {
  return (
    <div className="not-prose flex flex-wrap gap-2">
      <Badge>Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="destructive">Destructive</Badge>
    </div>
  );
}

export function DemoInput() {
  return (
    <div className="not-prose grid max-w-sm gap-2">
      <Label htmlFor="demo-email">Email</Label>
      <Input id="demo-email" placeholder="you@example.com" type="email" />
    </div>
  );
}

export function DemoSkeleton() {
  return (
    <div className="not-prose flex max-w-sm flex-col gap-2">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-24 w-full" />
    </div>
  );
}

export function DemoCard() {
  return (
    <Card className="not-prose max-w-sm">
      <CardHeader>
        <CardTitle>Card</CardTitle>
        <CardDescription>Basic card layout primitives.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm">Use with Better Living product surfaces.</p>
      </CardContent>
      <CardFooter>
        <Button size="sm">Action</Button>
      </CardFooter>
    </Card>
  );
}
