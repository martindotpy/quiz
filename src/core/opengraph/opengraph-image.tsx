import type { RenderFunctionInput } from "astro-opengraph-images"
import { twj } from "tw-to-css"
import { appName, defaultTitle } from "../constant/seo-constant"

// Constants
const fontFamily = "Geist"

// Component
type OpenGraphImageProps = Pick<RenderFunctionInput, "title" | "description">

export function OpenGraphImage({
  title,
  description,
}: OpenGraphImageProps): Promise<React.ReactElement> {
  // eslint-disable-next-line react-compiler/react-compiler
  "use no memo"

  const finalTitle =
    title !== defaultTitle
      ? title.replace(new RegExp(`\\| ${appName}$`), "").trim()
      : appName

  return Promise.resolve(
    <div
      style={{
        ...twj`relative flex h-full w-full flex-col items-start justify-end gap-6 overflow-hidden bg-black p-12 text-white shadow-2xl`,
        fontFamily,
      }}
    >
      {/* Line */}
      <div
        style={twj`absolute inset-0 top-0 left-6 flex h-full w-0.5 bg-blue-800/25`}
      ></div>

      {/* Background */}
      <div
        style={{
          ...twj`absolute inset-0 flex h-full w-full text-white`,
          background: `radial-gradient(circle at 30% 50%, rgba(29, 78, 216, 0.25), transparent 80%)`,
          filter: "blur(50px)",
        }}
      ></div>

      {/* Content */}
      <div style={twj`flex h-full w-full flex-col justify-around`}>
        <div style={twj`flex flex-1 flex-col justify-end text-transparent`}>
          <h1
            style={{
              ...twj`text-8xl font-black uppercase`,
              backgroundImage:
                "linear-gradient(90deg, #bfdbfe 0%, #3b82f6 20%, #3b82f6 40%, #bfdbfe 100%)",
              backgroundClip: "text",
            }}
          >
            {finalTitle}
          </h1>

          {description && (
            <p
              style={twj`line-clamp-3 text-2xl leading-tight text-ellipsis text-gray-300`}
            >
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
