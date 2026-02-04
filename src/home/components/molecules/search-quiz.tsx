import { ControlledTextInput } from "@/core/components/form/controlled/controlled-text-input"
import { QuizSearch } from "@/home/model/quiz-search-model"
import { Route } from "@/pages/_app/routes/{-$locale}/_main/route"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { TbSearch } from "react-icons/tb"

// Component
export function SearchQuiz() {
  // Query
  const { q } = Route.useSearch()

  // Navigate
  const navigate = useNavigate()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(QuizSearch),
    defaultValues: { q: q ?? "" },
    values: {
      q,
    },
  })

  const onChange = handleSubmit((data) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      search: (prev) => ({ ...prev, q: data.q?.trim() || undefined }),
    })
  })

  return (
    <form onChange={onChange} className="flex max-w-md flex-1 px-4">
      <ControlledTextInput
        name="q"
        control={control}
        inputProps={{ placeholder: "Search" }}
        icon={TbSearch}
      />
    </form>
  )
}
