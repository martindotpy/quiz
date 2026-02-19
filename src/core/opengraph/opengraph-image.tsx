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
      ? title.replace(new RegExp(`^${appName}\\s*\\|\\s*`), "").trim()
      : appName

  return Promise.resolve(
    <div
      style={{
        ...twj`relative flex h-full w-full flex-col overflow-hidden`,
        fontFamily,
        background: "#0a0a0a",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 24,
          right: 32,
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(250,250,250,0.03) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(25px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -200,
          left: -108,
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(250,250,250,0.02) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(25px)",
        }}
      />

      <svg
        width="400"
        height="400"
        viewBox="0 0 24 24"
        style={{
          position: "absolute",
          bottom: -120,
          right: -80,
          opacity: 0.025,
          transform: "rotate(15deg)",
        }}
        role="img"
        aria-label={`${appName} favicon`}
      >
        <title>{appName}</title>
        <path
          d="M10 2a3 3 0 0 1 2.995 2.824l.005 .176v1h3a2 2 0 0 1 1.995 1.85l.005 .15v3h1a3 3 0 0 1 .176 5.995l-.176 .005h-1v3a2 2 0 0 1 -1.85 1.995l-.15 .005h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-1a1 1 0 0 0 -1.993 -.117l-.007 .117v1a2 2 0 0 1 -1.85 1.995l-.15 .005h-3a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 1.85 -1.995l.15 -.005h1a1 1 0 0 0 .117 -1.993l-.117 -.007h-1a2 2 0 0 1 -1.995 -1.85l-.005 -.15v-3a2 2 0 0 1 1.85 -1.995l.15 -.005h3v-1a3 3 0 0 1 3 -3z"
          fill="#fafafa"
        />
      </svg>

      <div
        style={{
          position: "absolute",
          top: 52,
          left: 52,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            background: "#fafafa",
            borderRadius: 2,
          }}
        />
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#737373",
          }}
        >
          {appName}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          top: 132,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          padding: "72px 64px 72px 52px",
        }}
      >
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              width: 3,
              height: "90%",
              background: "rgba(250,250,250,0.08)",
            }}
          />

          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h1
              style={{
                fontSize: finalTitle.length > 20 ? 72 : 88,
                fontWeight: 600,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "#fafafa",
                margin: 0,
                maxWidth: "85%",
              }}
            >
              {finalTitle}
            </h1>

            {description && (
              <p
                style={{
                  fontSize: 20,
                  fontWeight: 400,
                  lineHeight: 1.5,
                  color: "#737373",
                  margin: "24px 0 0 0",
                  maxWidth: 520,
                }}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 48,
          left: 56,
          right: 56,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 32,
              height: 1,
              background: "rgba(250,250,250,0.15)",
            }}
          />
          <div
            style={{
              width: 16,
              height: 1,
              background: "rgba(250,250,250,0.08)",
            }}
          />
          <div
            style={{
              width: 8,
              height: 1,
              background: "rgba(250,250,250,0.05)",
            }}
          />
        </div>
      </div>
    </div>
  )
}
