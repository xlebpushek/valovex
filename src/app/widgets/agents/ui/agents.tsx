import { AgentCardEntity } from '@/app/entities/agent-card'
import { agents } from '@/shared/config/agents'

export function AgentsWidget() {
  return (
    <div className="grid grid-cols-4 gap-2 xs:grid-cols-5 sm:grid-cols-8 lg:grid-cols-12">
      {agents.map((agent, index) => (
        <button key={index}>
          <AgentCardEntity name={agent.name} role={agent.role} description={agent.description} image={agent.image} />
        </button>
      ))}
    </div>
  )
}
