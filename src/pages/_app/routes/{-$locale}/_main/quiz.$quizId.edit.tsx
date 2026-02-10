import { createFileRoute, redirect } from "@tanstack/react-router"

// Route
export const Route = createFileRoute("/{-$locale}/_main/quiz/$quizId/edit")({
  beforeLoad: ({ location }) => {
    if (location.pathname.endsWith("/edit"))
      throw redirect({
        to: "/{-$locale}/quiz/$quizId/edit/$questionId",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        params: (prevParams) => ({
          ...prevParams,
          questionId: "1",
        }),
      })
  },
  staticData: {
    editMode: true,
  },
})
