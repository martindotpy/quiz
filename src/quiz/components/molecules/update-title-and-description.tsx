import { Button } from "@/core/components/ui/button"
import { Dialog, DialogTrigger } from "@/core/components/ui/dialog"

// Component
export function UpdateTitleAndDescription() {
  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="secondary">Title and Description</Button>}
      />
    </Dialog>
  )
}
