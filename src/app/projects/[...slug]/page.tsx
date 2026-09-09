import { redirect } from "next/navigation";

export default async function ProjectsSlugPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const path = Array.isArray(slug) ? slug.join("/") : "";
  redirect(`/dashboard/project/${path}`);
}
