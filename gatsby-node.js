exports.onCreateNode = async ({
  actions: { createNode, createParentChildLink },
  node,
  createContentDigest,
  createNodeId,
  loadNodeContent
}) => {
  if ('data.json' !== node.base) {
    return
  }

  const data = JSON.parse(await loadNodeContent(node))

  const childA = await Promise.resolve(new Promise(resolve => {
    const child = {
      ...data,
      id: createNodeId(`${node.id} A`),
      children: [],
      parent: node.id
    }

    child.internal = {
      contentDigest: createContentDigest(child),
      type: 'timeoutA'
    }

    resolve(child)
  }))

  createNode(childA)
  createParentChildLink({ parent: node, child: childA })

  const childB = await Promise.resolve(new Promise(resolve => {
    const child = {
      ...data,
      id: createNodeId(`${node.id} B`),
      children: [],
      parent: node.id
    }

    child.internal = {
      contentDigest: createContentDigest(child),
      type: 'timeoutB'
    }

    setTimeout(() => {
      resolve(child)
    }, 1000)
  }))

  createNode(childB)
  createParentChildLink({ parent: node, child: childB })
}
