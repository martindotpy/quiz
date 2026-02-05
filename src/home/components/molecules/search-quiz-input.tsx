import { ControlledInput } from "@/core/components/form/controlled/controlled-input"
import { SearchQuizParams } from "@/home/model/quiz-search-model"
import { Route as QuizQueryRoute } from "@/pages/_app/routes/{-$locale}/_main/route"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "react-hook-form"
import { TbSearch } from "react-icons/tb"

// Component
export function SearchQuiz() {
  // Query
  const { q: rawQ } = QuizQueryRoute.useSearch()
  const q = rawQ ?? ""

  // Navigate
  const navigate = useNavigate()

  // Form
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(SearchQuizParams),
    defaultValues: { q },
    values: {
      q,
    },
  })

  const onChange = handleSubmit((data) => {
    navigate({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      search: (prev) => ({ ...prev, q: data.q.trim() || undefined }),
    })
  })

  return (
    <form onChange={onChange} className="flex max-w-md flex-1 px-4">
      <ControlledInput
        name="q"
        control={control}
        inputProps={{ placeholder: "Search" }}
        icon={TbSearch}
      />
    </form>
  )
}
