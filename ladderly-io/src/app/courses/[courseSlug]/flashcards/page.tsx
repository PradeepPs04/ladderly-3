import { LadderlyPageWrapper } from '~/app/core/components/page-wrapper/LadderlyPageWrapper'
import FlashcardsContent from './FlashcardsContent'

// This enables revalidation at most every hour
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: { courseSlug: string }
}) {
  // Provide a generic metadata that doesn't require API calls
  return {
    title: `Flashcards - Ladderly Courses`,
    description: `Practice concepts with these flashcards.`,
    alternates: {
      canonical: `/courses/${params.courseSlug}/flashcards`,
    },
  }
}

export default function CourseFlashcardsPage({
  params,
}: {
  params: { courseSlug: string }
}) {
  // Wrap the entire page with authentication
  return (
    <LadderlyPageWrapper authenticate requirePremium>
      <FlashcardsContent courseSlug={params.courseSlug} />
    </LadderlyPageWrapper>
  )
}
