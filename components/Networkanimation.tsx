import React, { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  baseVx: number;
  baseVy: number;
}

interface NetworkAnimationProps {
  nodeColor?: string;
  nodeOpacity?: number;
  connectionColor?: string;
  connectionOpacity?: number;
  nodeSize?: number;
  nodeCount?: number;
  connectionDistance?: number;
  animationSpeed?: number;
  mouseAttractionStrength?: number;
  expansionSpeed?: number;
  baseMovementSpeed?: number;
  dampingFactor?: number;
  className?: string;
}

const NetworkAnimation: React.FC<NetworkAnimationProps> = ({
  nodeColor = '#0099FF',
  nodeOpacity = 0.8,
  connectionColor = '#0099FF',
  connectionOpacity = 0.3,
  nodeSize = 4,
  nodeCount = 50,
  connectionDistance = 150,
  animationSpeed = 1,
  mouseAttractionStrength = 1,
  expansionSpeed = 1,
  baseMovementSpeed = 0.5,
  dampingFactor = 0.995,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number | null>(null);

  const dimensionsRef = useRef({ width: 0, height: 0 });
  const propsRef = useRef({
    nodeColor,
    nodeOpacity,
    connectionColor,
    connectionOpacity,
    nodeSize,
    nodeCount,
    connectionDistance,
    animationSpeed,
    mouseAttractionStrength,
    expansionSpeed,
    baseMovementSpeed,
    dampingFactor
  });

  // Update props ref on every render
  useEffect(() => {
    propsRef.current = {
      nodeColor,
      nodeOpacity,
      connectionColor,
      connectionOpacity,
      nodeSize,
      nodeCount,
      connectionDistance,
      animationSpeed,
      mouseAttractionStrength,
      expansionSpeed,
      baseMovementSpeed,
      dampingFactor
    };
  });

  const initializeNodes = (width: number, height: number) => {
    if (nodesRef.current.length === 0 || nodesRef.current.length !== propsRef.current.nodeCount) {
      nodesRef.current = Array.from({ length: propsRef.current.nodeCount }, () => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.3 + Math.random() * 0.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          targetX: 0,
          targetY: 0,
          baseVx: Math.cos(angle) * speed,
          baseVy: Math.sin(angle) * speed
        };
      });
    }
  };

  const updateNodes = (width: number, height: number, deltaSpeed: number) => {
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const hasMouseInteraction = mouseX > -500 && mouseY > -500;

    nodesRef.current.forEach((node) => {
      // Constantly expand outward from center
      const centerX = width / 2;
      const centerY = height / 2;
      const dx = node.x - centerX;
      const dy = node.y - centerY;
      const distanceFromCenter = Math.sqrt(dx * dx + dy * dy);

      if (distanceFromCenter > 0) {
        const expansionForce = propsRef.current.expansionSpeed * 0.01 * deltaSpeed;
        node.vx += (dx / distanceFromCenter) * expansionForce;
        node.vy += (dy / distanceFromCenter) * expansionForce;
      }

      // Apply base movement
      const baseMovementForce = propsRef.current.baseMovementSpeed * 0.01 * deltaSpeed;
      node.vx += node.baseVx * baseMovementForce;
      node.vy += node.baseVy * baseMovementForce;

      // Apply mouse attraction force (subtle)
      if (hasMouseInteraction) {
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mouseDistance > 0) {
          const attractionForce = propsRef.current.mouseAttractionStrength * 0.0001 * deltaSpeed;
          node.vx += (mdx / mouseDistance) * attractionForce * mouseDistance;
          node.vy += (mdy / mouseDistance) * attractionForce * mouseDistance;
        }
      }

      node.x += node.vx * deltaSpeed;
      node.y += node.vy * deltaSpeed;

      // Bounce back when reaching edges
      if (node.x < 0) {
        node.x = 0;
        node.vx = Math.abs(node.vx);
      }
      if (node.x > width) {
        node.x = width;
        node.vx = -Math.abs(node.vx);
      }
      if (node.y < 0) {
        node.y = 0;
        node.vy = Math.abs(node.vy);
      }
      if (node.y > height) {
        node.y = height;
        node.vy = -Math.abs(node.vy);
      }

      // Configurable damping
      node.vx *= propsRef.current.dampingFactor;
      node.vy *= propsRef.current.dampingFactor;

      const maxSpeed = 2;
      const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
      if (speed > maxSpeed) {
        node.vx = (node.vx / speed) * maxSpeed;
        node.vy = (node.vy / speed) * maxSpeed;
      }
    });
  };

  const drawNodes = (ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = propsRef.current.nodeColor;
    ctx.globalAlpha = propsRef.current.nodeOpacity;

    nodesRef.current.forEach((node) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, propsRef.current.nodeSize, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
  };

  const drawConnections = (ctx: CanvasRenderingContext2D) => {
    ctx.lineWidth = 1;
    const mouseX = mouseRef.current.x;
    const mouseY = mouseRef.current.y;
    const hasMouseInteraction = mouseX > -500 && mouseY > -500;

    // Draw connections from mouse to nearby nodes
    if (hasMouseInteraction) {
      nodesRef.current.forEach((node) => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < propsRef.current.connectionDistance) {
          const opacity = (1 - distance / propsRef.current.connectionDistance) * propsRef.current.connectionOpacity;
          ctx.globalAlpha = opacity;
          ctx.strokeStyle = propsRef.current.connectionColor;
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(node.x, node.y);
          ctx.stroke();
        }
      });
    }

    // Track connections per node
    const connectionCounts = new Map<number, Set<number>>();
    const drawnConnections = new Set<string>();

    // Helper to draw a connection
    const drawConnection = (i: number, j: number, distance: number) => {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (drawnConnections.has(key)) return;

      const nodeA = nodesRef.current[i];
      const nodeB = nodesRef.current[j];
      const opacity = Math.min(1, 1 - distance / propsRef.current.connectionDistance) * propsRef.current.connectionOpacity;

      ctx.globalAlpha = opacity;
      ctx.strokeStyle = propsRef.current.connectionColor;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();

      drawnConnections.add(key);

      if (!connectionCounts.has(i)) connectionCounts.set(i, new Set());
      if (!connectionCounts.has(j)) connectionCounts.set(j, new Set());
      connectionCounts.get(i)!.add(j);
      connectionCounts.get(j)!.add(i);
    };

    // First pass: draw distance-based connections
    for (let i = 0; i < nodesRef.current.length; i++) {
      for (let j = i + 1; j < nodesRef.current.length; j++) {
        const nodeA = nodesRef.current[i];
        const nodeB = nodesRef.current[j];
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < propsRef.current.connectionDistance) {
          drawConnection(i, j, distance);
        }
      }
    }

    // Second pass: ensure each node has at least 2 connections
    for (let i = 0; i < nodesRef.current.length; i++) {
      const currentConnections = connectionCounts.get(i)?.size || 0;

      if (currentConnections < 2) {
        // Find nearest nodes
        const distances: { index: number; distance: number }[] = [];
        for (let j = 0; j < nodesRef.current.length; j++) {
          if (i === j) continue;
          if (connectionCounts.get(i)?.has(j)) continue;

          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          distances.push({ index: j, distance });
        }

        // Sort by distance and connect to nearest
        distances.sort((a, b) => a.distance - b.distance);
        const needed = 2 - currentConnections;
        for (let k = 0; k < Math.min(needed, distances.length); k++) {
          drawConnection(i, distances[k].index, distances[k].distance);
        }
      }
    }

    ctx.globalAlpha = 1;
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = dimensionsRef.current.width;
    const height = dimensionsRef.current.height;

    ctx.clearRect(0, 0, width, height);

    const deltaSpeed = propsRef.current.animationSpeed;
    updateNodes(width, height, deltaSpeed);
    drawConnections(ctx);
    drawNodes(ctx);

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  // Setup canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const updateDimensions = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      dimensionsRef.current = { width: rect.width, height: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }

      initializeNodes(rect.width, rect.height);
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Setup mouse tracking
  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handlePointerLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // Start animation loop
  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [nodeColor, connectionColor, nodeOpacity, connectionOpacity, nodeSize, connectionDistance, animationSpeed, mouseAttractionStrength]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none'
      }}
    />
  );
};

export default NetworkAnimation;